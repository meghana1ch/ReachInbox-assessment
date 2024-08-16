import { Queue, Worker } from 'bullmq';
import { fetchGmailEmails } from './gmailOauth';
import { fetchOutlookEmails } from './outlookOauth';
import { analyzeEmail, generateReply } from './openaiService';
import { sendReply } from './emailService';

const emailQueue = new Queue('emailQueue');

export const setupBullMQ = () => {
    emailQueue.add('processEmails', {});

    const worker = new Worker('emailQueue', async job => {
        const gmailEmail = await fetchGmailEmails();
        const outlookEmail = await fetchOutlookEmails();

        const emails = [gmailEmail, outlookEmail].filter(Boolean);

        for (const email of emails) {
            const category = await analyzeEmail(email);
            const reply = await generateReply(category);
            await sendReply('gmail', 'recipient@example.com', 'Re: Your inquiry', reply);  // Change for Outlook if necessary
        }
    });

    worker.on('completed', job => {
        console.log(`Completed job ${job.id}`);
    });

    worker.on('failed', (job, err) => {
        console.error(`Failed job ${job.id}: ${err}`);
    });
};
