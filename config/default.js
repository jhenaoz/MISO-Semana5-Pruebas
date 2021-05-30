module.exports = {
  "url": "https://ghost3-42-5.herokuapp.com/ghost",
  "adminUser": {
    "email": "admin-user@mailsac.com",
    "password": "Test4echo!"
  },
  "editorUser": {
    "email": "admin-user@mailsac.com",
    "password": "Test4echo!"
  },
  "resemble": {
    "browsers":["chrome"],
    "options": {
      "output": {
        "errorColor": {
          "red": 255,
          "green": 0,
          "blue": 255
        },
        "errorType": "movement",
        "largeImageThreshold": 1200,
        "useCrossOrigin": false,
        "outputDiff": true
      },
      "scaleToSameSize": true,
      "ignore": "antialiasing"
    },
    "viewportHeight": 600,
    "viewportWidth": 800
  },
  "backstop:":
  {
    "id": "backstop_default",
    "viewports": [
      {
        "label": "tablet",
        "width": 1024,
        "height": 768
      }
    ],
    "onBeforeScript": "puppet/onBefore.js",
    "onReadyScript": "puppet/onReady.js",
    "scenarios": [
      {
        "label": "Login Page",
        "cookiePath": "backstop_data/engine_scripts/cookies.json",
        "url": `http://localhost:3000/3.3.0/error-pass.png`,
        "referenceUrl": "",
        "readyEvent": "",
        "readySelector": "",
        "delay": 500,
        "hideSelectors": [],
        "removeSelectors": [],
        "hoverSelector": "",
        "clickSelector": "",
        "postInteractionWait": 0,
        "selectors": [],
        "selectorExpansion": true,
        "expect": 0,
        "misMatchThreshold" : 0.1,
        "requireSameDimensions": true
      }
    ],
    "paths": {
      "bitmaps_reference": "backstop_data/bitmaps_reference",
      "bitmaps_test": "backstop_data/bitmaps_test",
      "engine_scripts": "backstop_data/engine_scripts",
      "html_report": "backstop_data/html_report",
      "ci_report": "backstop_data/ci_report"
    },
    "report": ["browser"],
    "engine": "puppeteer",
    "engineOptions": {
      "args": ["--no-sandbox"]
    },
    "asyncCaptureLimit": 5,
    "asyncCompareLimit": 50,
    "debug": false,
    "debugWindow": false
  }
  
}
