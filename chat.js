import prompt from "prompt-sync"
import { Configuration, OpenAIApi } from "openai"
import * as dotenv from 'dotenv'

import search from "./lib/search.js"
import generateResponse from "./lib/generate.js"



dotenv.config()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const p = prompt()
let userPrompt = ""

while (true){
    console.log("\x1b[36mEnter your prompt for ChatGPT:\n")
    userPrompt = p("\x1b[37m")
    if(userPrompt == null){ break }

    const searchResult = await search(userPrompt)

    const generationResult = await generateResponse(userPrompt, searchResult, openai)

    console.log("\n\x1b[32mAnswer: \n")
    console.log("\x1b[37m"+generationResult + "\n\n")
    
}
