import * as Sentry from '@sentry/react';

export const logError = (message: string, extra: Record<string, unknown>) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(message, extra);
  }
  Sentry.captureException(new Error(message), { extra });
};
