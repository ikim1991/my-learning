import cors from 'cors';
import config from '../config';

export default cors(config.cors)