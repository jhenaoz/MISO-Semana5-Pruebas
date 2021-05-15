const { readdirSync, readFileSync, writeFileSync, copyFileSync} = require('fs');
const compareImages = require("resemblejs/compareImages")
const config = require('config');

let datetime = new Date().toISOString().replace(/:/g,".");
const images = readdirSync('./images/3.3.0')
images.forEach(async (image) => {

    const data = await compareImages(
        readFileSync(`./images/3.3.0/${image}`),
        readFileSync(`./images/3.42.5/${image}`),
        config.resemble.options
    );

    let comparisonResult = {
        image,
        isSameDimensions: data.isSameDimensions,
        dimensionDifference: data.dimensionDifference,
        rawMisMatchPercentage: data.rawMisMatchPercentage,
        misMatchPercentage: data.misMatchPercentage,
        diffBounds: data.diffBounds,
        analysisTime: data.analysisTime
    }

    writeFileSync(`./images/resemble/${image}`, data.getBuffer());
    function browser(b, comparisionResult){
        console.log('COMP', comparisionResult)
        return `<div class=" browser" id="test0">
        <div class=" btitle">
            <h2>Browser: ${b}</h2>
            <p>Data: ${JSON.stringify(comparisionResult)}</p>
        </div>
        <div class="imgline">
          <div class="imgcontainer">
            <span class="imgname">Reference</span>
            <img class="img2" src="../images/3.3.0/${comparisionResult.image}" id="refImage" label="Reference">
          </div>
          <div class="imgcontainer">
            <span class="imgname">Test</span>
            <img class="img2" src="../images/3.42.5/${comparisionResult.image}" id="testImage" label="Test">
          </div>
        </div>
        <div class="imgline">
          <div class="imgcontainer">
            <span class="imgname">Diff</span>
            <img class="imgfull" src="../images/resemble/${comparisionResult.image}" id="diffImage" label="Diff">
          </div>
        </div>
      </div>`
    }
    
    function createReport(datetime, comparisionResult){
        return `
        <html>
            <head>
                <title> VRT Report </title>
                <link href="index.css" type="text/css" rel="stylesheet">
            </head>
            <body>
                <h1>Report for 
                     <a href="${config.url}"> ${config.url}</a>
                </h1>
                <p>Executed: ${datetime}</p>
                <div id="visualizer">
                    ${browser("Chrome", comparisionResult)}
                </div>
            </body>
        </html>`
    }
    writeFileSync(`./results/report.html`, createReport(datetime, comparisonResult));
});
