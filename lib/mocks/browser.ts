import { isSSR } from 'lib/utils';
import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const worker = !isSSR() && setupWorker(...handlers);
