const links = require('./dataVm.json');
var url;
links.forEach(element => {
    url = element.href;
    console.log(url);
});
