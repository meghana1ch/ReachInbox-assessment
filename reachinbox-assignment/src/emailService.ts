import { google } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config();

const sendGmailReply = async (to: string, subject: string, body: string) => {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const message = `To: ${to}\r\nSubject: ${subject}\r\n\r\n${body}`;

    await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: Buffer.from(message).toString('base64'),
        },
    });
};

export const sendReply = async (emailType: 'gmail' | 'outlook', to: string, subject: string, body: string) => {
    if (emailType === 'gmail') {
        await sendGmailReply(to, subject, body);
    }
    // Similarly, implement for Outlook
};
