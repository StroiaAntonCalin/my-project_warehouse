import * as dotenv from 'dotenv';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const candidates = [join(process.cwd(), '.env'), join(process.cwd(), '../../.env')];
const envFile = candidates.find((candidate) => existsSync(candidate));

if (envFile) dotenv.config({ path: envFile, override: true });

export function openAiEnvironmentStatus() {
  return {
    envFile: envFile ?? 'not found',
    apiKey: process.env.OPENAI_API_KEY ? 'loaded' : 'missing',
    model: process.env.OPENAI_MODEL ?? 'gpt-5.2'
  };
}
