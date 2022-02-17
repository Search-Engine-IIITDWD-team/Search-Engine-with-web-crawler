# Search Engine with web crawler
### To run the website on your local machine
```
npm install
nodemon server
```
and visit http://localhost:8080

### To run the crawler
```
nodemon crawler.js
```

### How it works?
We are using cheerio to scan webpages for links and minisearch to scan the data and give relevant links.
1. The crawler first scans the website it is linked with and then saves text linked with the link.
2. While doing so the crawler also checks whether link was already saved in the database.
3. Since this search engine is especially made for data found on government websites, our crawler filters the links and saves data only related to govenment websites.
4. All this data is saved in a json file
5. Once we have enough data we can serach throw that data through our website.

Here is a demo for the search engine

[![Watch the video](https://user-images.githubusercontent.com/78674160/154482916-70887f30-50bf-4f1f-ba15-e7f0fca5d79b.png)](https://drive.google.com/file/d/17DPbUZBH1AObqWO8mSSS7ABvWhp9ngBN/view)
