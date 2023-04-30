# SearchGPT

SearchGPT augments GPT with access to the internet, corutesy of the Bing Web Search API. 

### Limitations
- SearchGPT struggles to parse data-rich websites with varying formatting. For example, when asked for the score from a recent baseball game, it returns the record of the winning team.
- SearchGPT may also fall-back on outdated data from GPT. When asked a stock price, it might provide a quote from before GPT's September 2021 cut-off. 

### Credit
- Parsing site content using JSDOM borrowed from Chatbot-UI by [mckaywrigley](https://github.com/mckaywrigley)
