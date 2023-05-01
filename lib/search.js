import fetch from "node-fetch"
import jsdom, { JSDOM } from "jsdom"
import { Readability } from "@mozilla/readability"
import * as dotenv from 'dotenv'
dotenv.config()

export default async function search(query){
    const searchUrls = await getUrls(query)
    const sources = await parseSources(searchUrls)

    return sources
}

const getUrls = async (query)=>{
    const urlEncodedQuery = encodeURIComponent(query)
    const urlWithQuery = `https://api.bing.microsoft.com/v7.0/search?q=${urlEncodedQuery}&count=5&responseFilter=webpages,news`
    const searchResults = await fetch(urlWithQuery, {
        headers:  { 
            'Ocp-Apim-Subscription-Key': process.env.AZURE_SUBSCRIPTION_KEY
        },
    })
    if(!searchResults.ok){
        return ""
    }
    const resultJson = await searchResults.json()
    const webpages = resultJson.webPages.value
    const news = resultJson.news?.value
    const urls = news ? news.concat(webpages).map(site => site.url) : webpages.map(site => site.url)
    return urls
}

const parseSources = async (urls)=>{
    let sources = []
    for (let i=0; i<urls.length; i++){
        const currUrl = urls[i]
        const urlResult = await fetch(currUrl)
        const pageText = await urlResult.text()
        const dom = new JSDOM(pageText)
        const doc = dom.window.document;
        const parsed = new Readability(doc).parse();
        if(parsed){
            const sourceContent = parsed.textContent.slice(0,1000)
            sources.push({
                url: currUrl,
                content: sourceContent.replaceAll("\n", "").trim()
            })
        }
    }
    return sources
}