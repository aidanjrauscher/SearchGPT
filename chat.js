import prompt from "prompt-sync"
import { Configuration, OpenAIApi } from "openai"
import * as dotenv from 'dotenv'

import search from "./search"


(async()=>{
    dotenv.config()
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const p = prompt()
    let userPrompt = ""

    while (true){
        userPrompt = p("Enter your prompt for ChatGPT:")
        if(userPrompt == null){ break }

        const searchResult = search(userPrompt)
        // const completion = await openai.createChatCompletion({
        //     model: "gpt-3.5-turbo",
        //     messages: [{role: "user", content: userPrompt}],
        // })
        // console.log(completion.data.choices[0].message.content)
    }
})()