import session from 'express-session';
import configs from '../config';

export default session(configs.sessions)
