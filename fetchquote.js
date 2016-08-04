
var fs = require('fs');
var system = require('system');
var page = require('webpage').create();


function writeFile(path, content) {
    console.log('Write to file:', path);
    fs.write(path, content, 'w');
}

function getSummary(symbol) {
    url = 'https://finance.yahoo.com/quote/' + symbol;
    console.log('Fetch url', url);

    page.open(url, function(status) {
        console.log('status:', status);
        var title = page.evaluate(function() {
            return document.title;
        });
        console.log('title:', title);

        var data = page.evaluate(function() {
            return window.App.main.context.dispatcher.stores;
        });
        var summary = data.QuoteSummaryStore;
        console.log('summary:', summary);

        var summaryJson = JSON.stringify(summary, null, 4);
        var fileName = symbol + '.summary.json';
        writeFile(fileName, summaryJson);

        phantom.exit();
    });
}

// Main
var args = system.args;
var symbol;
if (args.length > 1) {
    symbol = args[1];
} else {
    symbol = 'NUGT';
}
getSummary(symbol);
