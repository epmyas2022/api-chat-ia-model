import * as fs from 'node:fs';
import * as path from 'node:path';
import { ContextStandardDriver } from '../drivers/context-standard.driver';
import { ContextExternalDriver } from '../drivers/context-external.driver';
import {
  ContextDto,
  ContextExternalDto,
} from '../api/chat/v1/model-mini-http.dto';
import { HttpClientService } from '@/shared/domain/services/http-client.service';
import { ContextDriver } from '@/model-ia/domain/drivers/context.driver';
import { ContextApi } from '../api/chat/v1/model-mini-http.dto';

export function loadPrompt(path: string): string {
  try {
    const prompt = fs.readFileSync(path, 'utf8');
    return prompt;
  } catch (error) {
    throw new Error(`Failed to load prompt: ${error} ${path}`);
  }
}

export function promptAboutMe(): {
  role: 'user' | 'assistant';
  content: string;
} {
  const content = loadPrompt(path.join(__dirname, 'about-me.txt'));
  return {
    role: 'user',
    content: content,
  };
}

export async function contextProvider(
  context: ContextDriver<ContextDto | ContextExternalDto>,
  contextApi: ContextApi,
  httpClient: HttpClientService,
): Promise<{ role: 'user' | 'assistant'; content: string } | undefined> {
  if (!contextApi) {
    return;
  }
  const strategies = {
    standard: {
      params: contextApi.context as ContextDto,
      driver: new ContextStandardDriver(),
    },
    external: {
      params: contextApi.external as ContextExternalDto,
      driver: new ContextExternalDriver(httpClient),
    },
  };

  const strategy = strategies[contextApi.driver];

  if (!strategy) {
    throw new Error(`El driver '${contextApi.driver}' no está soportado.`);
  }
  context.setContext(strategy.driver);

  const message = await context.context(strategy.params);

  return {
    role: 'user',
    content: message,
  };
}
