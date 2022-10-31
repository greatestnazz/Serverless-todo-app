// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'a0v8iex8jl'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/prod`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-urr35tr45bo21hcg.us.auth0.com',            // Auth0 domain
  clientId: 'Ay2Kg2415ACww3Nxqs94WHfs84NQuBkk',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
