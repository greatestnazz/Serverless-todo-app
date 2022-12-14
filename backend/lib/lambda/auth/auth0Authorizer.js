import 'source-map-support/register';
import { verify } from 'jsonwebtoken';
import { createLogger } from '../../utils/logger';
import Axios from 'axios';
const logger = createLogger('auth');
// Todo
const jwksUrl = 'https://dev-urr35tr45bo21hcg.us.auth0.com/.well-known/jwks.json';
export const handler = async (event) => {
    logger.info('Authorizing a user', event.authorizationToken);
    try {
        const jwtToken = await verifyToken(event.authorizationToken);
        logger.info('User was authorized', jwtToken);
        return {
            principalId: jwtToken.sub,
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Allow',
                        Resource: '*'
                    }
                ]
            }
        };
    }
    catch (e) {
        logger.error('User not authorized', { error: e.message });
        return {
            principalId: 'user',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Deny',
                        Resource: '*'
                    }
                ]
            }
        };
    }
};
async function verifyToken(authHeader) {
    try {
        const token = getToken(authHeader);
        const res = await Axios.get(jwksUrl);
        // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/
        const pemData = res['data']['keys'][0]['x5c'][0];
        const cert = `-----BEGIN CERTIFICATE-----\n${pemData}\n-----END CERTIFICATE-----`;
        return verify(token, cert, { algorithms: ['RS256'] });
    }
    catch (err) {
        logger.error('Fail to authenticate', err);
    }
}
function getToken(authHeader) {
    if (!authHeader)
        throw new Error('No authentication header');
    if (!authHeader.toLowerCase().startsWith('bearer '))
        throw new Error('Invalid authentication header');
    const split = authHeader.split(' ');
    const token = split[1];
    return token;
}
//# sourceMappingURL=auth0Authorizer.js.map