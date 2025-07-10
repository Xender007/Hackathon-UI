import { Configuration, LogLevel } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: 'bbc2e2de-cce1-44b0-9844-514e6ae941ec', // ⬅️ Replace with your Azure AD App Client ID
  authority: 'https://login.microsoftonline.com/94e1538a-3b46-4d3f-b78c-1f1613e4b6a2', // ⬅️ Replace with your Azure Tenant ID
  redirectUri: 'http://localhost:4200', // Or your redirect URI
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (!containsPii) {
          console.log(message);
        }
      },
      logLevel: LogLevel.Info,
    },
  },
};

export const loginRequest = {
  scopes: ['user.read'],
};

export const protectedResources = {
  graphMe: {
    endpoint: 'https://graph.microsoft.com/v1.0/me',
    scopes: ['user.read'],
  },
};
