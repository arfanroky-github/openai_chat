import {config} from 'dotenv'
config();
import {OpenAIApi, Configuration} from 'openai';

const openaiConfiguration = new Configuration({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

const openai = new OpenAIApi(openaiConfiguration);

const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{role: 'user', content: 'Hello there?'}]
})

console.log(response.data.choices)