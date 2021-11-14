var express = require("express");

//use the application off of express.
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

//define the route for "/"
// app.get("/", function (request, response) {
//     response.sendFile(__dirname + "/search.html");
// });

app.get("/searchQuery", function (request, response) {
    var keyword = request.query.keyword;
    const MiniSearch = require('minisearch')
    const documents = require('./dataVM.json')
    // const data = require("./data.json")

    let miniSearch = new MiniSearch({
        fields: ['text', 'href'], // fields to index for full-text search
        storeFields: ['text', 'href'], // fields to return with search results
        searchOptions: {
            prefix: true,
            fuzzy: 0.2,
            boost: { text: 2 }
        }        
    })

    // Index all documents
    miniSearch.addAll(documents)
    // miniSearch.addAll(data)
    // Search with default options

    let results = miniSearch.search(keyword)
    // let r2 = miniSearch.search(search)
    // if(results == r2){
    //     console.log("TRUE")
    // }
    console.log(results)
    // console.log(r2)
    response.render('pages/searchResult',{
        results: results,
        keyword: keyword
    });

});

app.get('/endpoint', function (req, res) {
    var obj = {};
    obj.title = 'title';
    obj.data = 'data';
    const MiniSearch = require('minisearch')

    // console.log('params: ' + JSON.stringify(req.params));
    // console.log('body: ' + JSON.stringify(req.body));
    // console.log('query: ' + JSON.stringify(req.query));
    var keyword = req.query.title
    console.log('query: ' + keyword);
    // console.log('query: ' + JSON.stringify(req.keyword));

    // A collection of documents for our examples
    const documents = require('./dataVM.json')

    let miniSearch = new MiniSearch({
        fields: ['title', 'text'], // fields to index for full-text search
        storeFields: ['title', 'category'] // fields to return with search results
    })

    // Index all documents
    miniSearch.addAll(documents)

    // Search with default options
    let results = miniSearch.autoSuggest(keyword)
    let resToSend;
    if (results.length > 10){
        for (let index = 0; index < 10; index++) {
            resToSend[index] = results[index]
        }
    }
    else{
        resToSend = results;
    }
    console.log(resToSend)

    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    // res.send(req.query.callback + '(' + JSON.stringify(obj) + ');');
    res.send(results);
    // res.send("")
});

// index page
app.get('/', function (req, res) {
    res.render('pages/index');
});


//start the server
app.listen(8080);

console.log("Something awesome to happen at http://localhost:8080");
