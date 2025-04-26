import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ErrorEnvException } from '../exceptions/error-env.exception';
import { EnvironmentVariable } from './env.variables';

export function validateEnvVariables(env: Record<string, unknown>) {
  const validateConfig = plainToInstance(EnvironmentVariable, env, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validateConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new ErrorEnvException(errors.toString());
  }

  return validateConfig;
}
