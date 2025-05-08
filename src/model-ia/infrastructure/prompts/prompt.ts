import * as fs from 'node:fs';
import * as path from 'node:path';
import { ModelMiniHttpDto } from '../api/chat/v1/model-mini-http.dto';

export function loadPrompt(path: string): string {
  try {
    const prompt = fs.readFileSync(path, 'utf8');
    return prompt;
  } catch (error) {
    throw new Error(`Failed to load prompt: ${error} ${path}`);
  }
}

export function promptAboutMe(dto: ModelMiniHttpDto): ModelMiniHttpDto {
  const content = loadPrompt(path.join(__dirname, 'about-me.txt'));
  dto.messages.push({
    role: 'user',
    content: content,
  });
  dto.messages.reverse();
  return dto;
}
