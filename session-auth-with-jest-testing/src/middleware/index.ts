import session from './session';
import cors from './cors';
import error from './error';
import authenticate from './auth';

const middleware = {
   session,
   cors,
   error,
   authenticate
}

export default middleware;