import { GetApiKeyService } from '@/model-ia/domain/services/get-api-key.service';
import { Injectable } from '@/shared/dependencies/injectable';
import { EnvironmentVariable } from '@/shared/environment/env.variables';
import { OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Browser } from 'playwright';
import { chromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { newInjectedContext } from 'fingerprint-injector';
import {
  Fingerprint,
  PrimitiveFingerprint,
} from '@/model-ia/domain/entities/fingerprint.entity';

@Injectable()
export class GetExternalDuckVqdService
  extends GetApiKeyService
  implements OnModuleDestroy
{
  private readonly fingerprintExpirationMinutes: number;
  private browser: Browser;
  private fingerprint?: Fingerprint;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariable>,
  ) {
    super();
    this.fingerprintExpirationMinutes =
      this.configService.get<number>('FINGERPRINT_EXPIRATION_MINUTES') ?? 60;
  }

  async onModuleInit() {
    chromium.use(StealthPlugin());

    this.browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }

  async onModuleDestroy() {
    if (this.browser) {
      await this.browser.close();
    }
  }
  async getApiKey(): Promise<PrimitiveFingerprint> {
    if (this.fingerprint && !this.fingerprint.isExpired()) {
      return this.fingerprint.toValue();
    }
    if (!this.browser) {
      await this.onModuleInit();
    }
    const externalUrl = this.configService.get<string>('EXTERNAL_API_KEY');
    const context = await newInjectedContext(this.browser, {
      fingerprintOptions: {
        devices: ['desktop', 'mobile'],
        operatingSystems: ['ios', 'android', 'windows', 'linux', 'macos'],
      },
    });

    const page = await context.newPage();

    let vqd: string = '';

    await page.route('**/*', async (route, request) => {
      const headers = request.headers();

      if (request.method() === 'POST' && headers['x-vqd-4']) {
        vqd = headers['x-vqd-4'];
      }

      await route.continue();
    });

    await page.goto(externalUrl!, { waitUntil: 'load', timeout: 60000 });

    const userAgent = await page.evaluate(() => navigator.userAgent);

    await page.waitForSelector(
      'button[type="button"]:has-text("Give It a Try")',
    );
    await page.click('button[type="button"]:has-text("Give It a Try")');

    await page.waitForSelector('button[type="button"]:has-text("I Agree")');
    await page.click('button[type="button"]:has-text("I Agree")');

    const textareaUserPrompt = 'textarea[name="user-prompt"]';

    await page.waitForSelector(textareaUserPrompt);

    await page.fill(textareaUserPrompt, 'DuckDuckGo AI Chat');

    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');

    this.fingerprint = Fingerprint.create({
      key: vqd,
      userAgent: userAgent,
      expiredIn: this.fingerprintExpirationMinutes,
    });

    return this.fingerprint.toValue();
  }
}
