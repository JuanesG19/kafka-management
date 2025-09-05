export const environment = {
  url: {
    domain: 'http://localhost:4200',
    kafkaBackendDomain: 'http://localhost:8089',
    famiWS02: 'https://intdevqa.famisanar.com.co/facval',
  },
  keys: {
    passToken: '7tMykyetfYCiVCXwfcrG',
    keyUserPassword: 'rT7PeKiL43pXzKZetB9n',
  },
  /*keycloack: {
    localStorageToken: 'token',
    clientIdKeycloack: 'famisanar-portal',
    inactivityTime: 900000,
  }*/
  famiWS02: {
    basicAuthClientCredentials: '',
    basicAuth:
      'bTdkTWJLODVpV2NNaG1yQUduQ1NUN2VlYnVBYTprTlVNaW90R2lLdWFZQk1Wc0ZXTmVpdUNmYVVh',
    localStorageToken: 'token',
    localStorageTokenValue: 'auth_token',
    domain: 'LDAP',
    inactivityTime: 900000,
  },
};
