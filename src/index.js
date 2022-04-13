/* eslint-disable no-console */
import * as Sentry from '@sentry/react';
import {BrowserTracing} from '@sentry/tracing';
import './App';

Sentry.init({
  dsn: 'https://0e8fa72d2d3e4bcca434b602fe9467d2@o1095587.ingest.sentry.io/6329172',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  beforeSend(event, hint) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.error(hint.originalException || hint.syntheticException);
      return null;
    }

    return event;
  },
});
