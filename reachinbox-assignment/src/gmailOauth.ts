import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import * as dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const fetchGmailEmails = async () => {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const res = await gmail.users.messages.list({
        userId: 'me',
        q: 'is:unread',
    });

    const messages = res.data.messages || [];
    for (const message of messages) {
        const emailData = await gmail.users.messages.get({
            userId: 'me',
            id: message.id,
        });
        const emailBody = emailData.data.snippet;
        // Process email
        return emailBody;
    }
};
