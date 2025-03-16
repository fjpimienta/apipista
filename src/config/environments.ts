import * as dotenv from 'dotenv';

export const PORT = parseInt(process.env.PORT || '3002', 10);

const environment = dotenv.config(
  {
    path: '.env'
  }
);

if (process.env.NODE_ENV !== 'production') {
  if (environment.error) {
    throw environment.error;
  }
}

export interface IEnvironment {
  fedex: {
    client_id: string;
    client_secret: string;
    fedex_account: string;
  }
}

export const getEnvironment = (): IEnvironment => {
  const environment: IEnvironment = {
    fedex: {
      client_id: process.env.FEDEX_CLIENT_ID || '',
      client_secret: process.env.FEDEX_CLIENT_SECRET || '',
      fedex_account: process.env.FEDEX_ACCOUNT || '',
    }
  };

  return environment;
};

export { environment as default };