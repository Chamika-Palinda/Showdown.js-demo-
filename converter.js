var showdown = require('showdown');
var fs = require('fs');
let filename = "README.md"


fs.readFile(process.cwd() + '/' + filename, function (err, data) {
    if (err) {
        throw err;
    }
    let text = data.toString();

    // var demo = function (converter) {
    //     return [
    //         {
    //             type: 'lang',
    //             regex: /\[(.*)\]\((.*)\.md\)/g,
    //             replace: '[$1]($2.html)'
    //         }
    //     ];
    // }

    converter = new showdown.Converter({
        ghCompatibleHeaderId: true,
        simpleLineBreaks: true,
        ghMentions: true,
        tables: true,
        // extensions: [demo]
    });

    html = converter.makeHtml(text)

    console.log(text);
    converter.setFlavor('github');
    console.log(html);

    let filePath = process.cwd() + "/README.html";
    fs.writeFile(filePath, html, { flag: "wx" }, function (err) {
        if (err) {
            console.log("File '" + filePath + "' already exists. Aborted!");
        } else {
            console.log("Done, saved to " + filePath);
        }
    });
});