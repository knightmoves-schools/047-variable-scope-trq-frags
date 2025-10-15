const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it('should create a global variable named distanceInMiles and set it to 100', async function() {
      const distanceInMiles = await page.evaluate(() => distanceInMiles);
      expect(distanceInMiles).toBeDefined();
      expect(distanceInMiles).toBe(100);
  });

  it('should create a function called estimatedArrivalTime that has no parameters', async function() {
      const arrivalTime = await page.evaluate(() => {
        return estimatedArrivalTime();
      });

      expect(arrivalTime).toBe(2);
  });

  it('should create a local vairable named milesPerHour within estimatedArrivalTime that is set to 50', async function() {
    const errorMessage = await page.evaluate(() => {
      try{
        return milesPerHour;
      }catch(err){
        return err.message;
      }
    });
    
    expect(errorMessage).toBe('milesPerHour is not defined');
  });

  it('should return the distanceInMiles divided by the milesPerHour from the estimatedArrivalTime function', async function() {
      const arrivalTime = await page.evaluate(() => {
        return estimatedArrivalTime();
      });

      expect(arrivalTime).toBe(2);
  });

  it('should assign the innerHTML of the HTML element with the id result to return value from estimatedArrivalTime', async function() {
      const innerHtml = await page.$eval("#result", (result) => {
        return result.innerHTML;
      });

      expect(innerHtml).toBe('2');
  });
});

