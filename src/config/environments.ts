import * as dotenv from 'dotenv';

export const PORT = parseInt(process.env.PORT || '3003', 10);

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

const getEnvSuffix = (): string => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return '_PROD';
    case 'qa':
      return '_QA';
    case 'development':
    default:
      return '_DEV';
  }
};

export interface IEnvironment {
  fedex: {
    client_id: string;
    client_secret: string;
    fedex_account: string;
  }
}

export const getEnvironment = (): IEnvironment => {
  const suffix = getEnvSuffix();
  
  const environment: IEnvironment = {
    fedex: {
      client_id: process.env[`FEDEX_CLIENT_ID${suffix}`] || '',
      client_secret: process.env[`FEDEX_CLIENT_SECRET${suffix}`] || '',
      fedex_account: process.env[`FEDEX_ACCOUNT${suffix}`] || '',
    }
  };

  return environment;
};

export { environment as default };