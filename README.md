## Background



In this project- I'm combining two passions of mine. Building tech and cars. The preface to this project is that I spend a lot of time on car trading websites - browsing for cars with all manner of specifications, price, age and rarity. The current website I use are Autotrader and Carandclassic. Whilst they provide an overall good user experience, I feel we are missing something in how we should be interacting with these websites in the advent of Large Language Model (LLM) commoditisation.

## Getting Started

First, run the development DB for via Docker (which is a prerequisite):

```bash
npm run db:start
```
Navigate to localhost:8080 and use or the credentials in the /localDB folder

Secondly, ensure you have nvm 20.11.1 or higher is installed. 
```bash
npm install
```
Lastly, to start the web server and visit localhost:3000
```bash
npm run dev
```

Demo example:
To generate independent demo examples for each company, you must place a brand logo on the vercel public storage blob inside the logos folder. 
To set the theme of the pages, you must decide a HEX colour - without the # as this is not escaped in a URL.

You can then visit localhost3000 and pass in your params. You do not need to provide the full URL for the logo - just the name.

http://localhost:3000/demo?brandName=Auto2000&primaryColor=FFFF00