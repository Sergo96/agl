// change production default_url if needed
const getWindow = typeof window === 'object';

const API_PROTOCOL = getWindow && document.location.protocol;
const API_HOST = getWindow && document.location.hostname;
const API_PORT = getWindow && document.location.port;

const BASE_URL: string = API_PROTOCOL + '//' + API_HOST + ':' + API_PORT + '/api/v1';
export const DEFAULT_URL: string = process.env.NODE_ENV != 'production' ? 'https://dev.agro.secl.pw/api/v1' : BASE_URL;
