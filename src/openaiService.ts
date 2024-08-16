import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const analyzeEmail = async (emailContent: string) => {
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Categorize this email: ${emailContent}`,
        max_tokens: 100,
    });
    return response.data.choices[0].text.trim();
};

export const generateReply = async (category: string) => {
    if (category.includes('Interested')) {
        return 'Thank you for your interest! Would you like to schedule a demo?';
    } else if (category.includes('Not Interested')) {
        return 'Thank you for your response. If you change your mind, feel free to reach out!';
    } else {
        return 'Can you please provide more details on what information you need?';
    }
};
