import * as fs from 'node:fs';
import * as path from 'node:path';

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
