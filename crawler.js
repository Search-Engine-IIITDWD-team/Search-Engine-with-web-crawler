const got = require('got');
const cheerio = require('cheerio');
const links = [];
const dataWeb = [];
const fs = require('fs');
const { count } = require('console');
const data =  require('./dataVM.json');
const linksFile = [];

//linksFile = data;

//let toSearchUrl;
function isSaved(checkUrl) {
    // console.log(links);
    let result = links.find(link => link.href === checkUrl)
    // console.log("Checking "+result)
    if (result) {
        // console.log(result.text + " is saved")
        return true;
    }
    // console.log("False")
    return false;
}

function isGov(checkUrl){
    return checkUrl.includes("gov.");
}

function isCompleteURL(checkUrl){

    if(checkUrl.slice(0, 4) == "http"){
        return true;
    }
    return false;
}

// function saveObjectt(){

// }
var index1 = 1;

const extractLinks = async (url) => {
    try {
        // Fetching HTML
        const response = await got(url);
        const html = response.body;

        // Using cheerio to extract <a> tags
        const $ = cheerio.load(html);

        const linkObjects = $('a');
        const dataObjects = $('body');
        // this is a mass object, not an array
        // Collect the "href" and "title" of each link and add them to an array
        linkObjects.each((index, element) => {
            // do not save the link if the link is already saved in the links object
            let anyURL = $(element).attr('href');
            if(isCompleteURL(anyURL) === false){
                anyURL = URL + anyURL
            }

            if (isSaved(anyURL) === false && isGov(anyURL) === true) {
                links.push({
                    id: index1,
                    text: $(element).text(), // get the text
                    href: anyURL, // get the href attribute
                    //text: $(element2).text(),
                    
                    
                });
                index1++;
                console.log("Added " + $(element).text() + " to the database")
                //console.log("Added " + $(element2).text() + " to the database")
                // console.log(anyURL)
                fs.appendFileSync('data.json', JSON.stringify(links), (error) => {
                    if (error) throw error;
                });
                extractLinks(anyURL)
                dataObjects.each((index, element) => {
        
                    dataWeb.push({
                        id: index1,
                        text: $(element).text(), // get the text
                        //href: anyURL, // get the href attribute
                        
                    });
                    //index1++;
                    console.log("Added " + $(element).text() + " to the database")
                    // console.log(anyURL)
                    fs.appendFileSync('data.json', JSON.stringify(dataWeb), (error) => {
                        if (error) throw error;
                    });
                        });
            }
            extractLinks(URL);
        });
        // fs.writeFileSync('file.json', JSON.stringify(links), (error) => {
        //     if (error) throw error;
        // });
        
        // do something else here with these links, such as writing to a file or saving them to your database

        
    } catch (error) {
        console.log("Failed because : " + error);
    }
};

// Try it
var URL = 'https://www.niti.gov.in';
extractLinks(URL);
// for (let index = 0; index < 100000; index++) {
    //     if(index%100 == 0){
        //         console.log("Waiting")
        //     }
        
        // }

console.log("These are links found")
//console.log(links.text());
        // fs.writeFile('file.json', JSON.stringify(links), (error) => {
            //     if (error) throw error;
            //   });
            // data.forEach(element =>{ 
            //     if(element.id > 0) {
            //         // for i>0, it will take valuse from the JSON file  
            //             URL = element.herf;
            //         // for i =0 same url value as defined later in const url = 'niti.gov.in';
            //     }
            //     extractLinks(URL);
            //    });