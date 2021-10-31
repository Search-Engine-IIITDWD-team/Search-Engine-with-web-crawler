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
        storeFields: ['text', 'href'] // fields to return with search results
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

// index page
app.get('/', function (req, res) {
    res.render('pages/index');
});


//start the server
app.listen(8080);

console.log("Something awesome to happen at http://localhost:8080");
