export default async function generateResponse(query, sources, openai){
    const date = new Date()
    const prompt = `
        You will be provided with a user query and a set of sources. Please provide a response to the user’s query using the sources. Give the response in plaint text. Include the links for any source you referenced enclosed in parenthesis. It is important the information in the response is up-to-date. Today is ${date.toLocaleDateString()}

        Example 1: 
        Query: What was the Phillies score yesterday? 
        Source: https://www.espn.com/mlb/team/_/name/phi/philadelphia-phillies
        Response: The Philadelphia Phillies beat the Houston Astros 6-1 yesterday (https://www.espn.com/mlb/team/_/name/phi/philadelphia-phillies).  

        Example 2:
        Query: What is the current price of Meta stock?
        Source: https://finance.yahoo.com/quote/META
        Response: Meta stock closed as 238.56 on Friday (https://finance.yahoo.com/quote/META). 

        Example 3:
        Query: What will the weather be link in New York City on Wednesday? 
        Source: https://weather.com/weather/tenday/l/New+York+NY+USNY0996:1:US
        Response: New York City will be cloudy with a high temperature of 55F and a 24% chance of rain (https://weather.com/weather/tenday/l/New+York+NY+USNY0996:1:US).

        Query: ${query}
        Source: ${sources.map(source=>`\n${source.url}\n${source.content}\n`)}
        Response: 
    `
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
    })
    return completion.data.choices[0].message.content
}