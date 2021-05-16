const { readdirSync, readFileSync, writeFileSync, copyFileSync} = require('fs');
const compareImages = require("resemblejs/compareImages")
const config = require('config');

async function generateComparison() {
  const comparisons = [];
  const images = readdirSync('./images/3.3.0')
  for (const image of images) {    
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
    comparisons.push(comparisonResult);
    writeFileSync(`./images/resemble/${image}`, data.getBuffer());
  }
  return comparisons;
}

function browser(b, comparisons){
  console.log('COMP', comparisons)
  let html = '';
  comparisons.forEach(comparisionResult => {
    html += `<div class=" browser" id="test0">
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
  })
  return html;
}

function createReport(datetime, comparisons){
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
              ${browser("Chrome", comparisons)}
          </div>
      </body>
  </html>`
}

async function generateReport() {
  const comparisons = await generateComparison();
  let datetime = new Date().toISOString().replace(/:/g,".");
  writeFileSync(`./results/report.html`, createReport(datetime, comparisons));
}

generateReport();

