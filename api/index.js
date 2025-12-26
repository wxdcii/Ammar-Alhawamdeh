import { createRequestHandler } from '@remix-run/vercel';
import * as build from '../build/server/index.js';

export const config = {
  runtime: 'nodejs18.x',
};

export default createRequestHandler({
  build,
});
