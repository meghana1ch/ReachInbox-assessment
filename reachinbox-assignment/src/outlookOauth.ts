import * as microsoftGraph from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import * as dotenv from 'dotenv';

dotenv.config();

const client = microsoftGraph.Client.initWithMiddleware({
    authProvider: new TokenCredentialAuthenticationProvider(/* Token credentials */),
});

export const fetchOutlookEmails = async () => {
    const messages = await client.api('/me/messages').get();
    const emailBody = messages.value[0].body.content;
    // Process email
    return emailBody;
};
