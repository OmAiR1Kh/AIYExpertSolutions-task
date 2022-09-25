// importing the most convinient library for this task
const puppeteer = require("puppeteer");

// choosing the link of the product I want


/*
<----------------------------------------------------------------
// IMPORTANT TO READ
// if you want to try this on a different product please just change this Link
--------------------------------------------------------------->
*/


const URL = "https://www.walmart.com/ip/blaze/51778527";

// function to open the browser

const initializeBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // this is the path to my browser
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    ignoreDefaultArgs: ["--enable-automation"],
    slowMo: 10,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  return page;
};

// puppeteer is not working properly with it's page.waitFor() function
// this function is created to replace it

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

// function of adding the item to the cart

const addToCart = async (page) => {
  await page.$eval('button[class="w_3 w_5 w_AA"]', (element) => {
    element.click();
  });
  await delay(5000);
  await page.$eval('button[class="w_3 w_5 w_8 w_AA"]', (element) => {
    element.click();
  });
  await delay(5000);
  await page.$eval('button[class="w_3 w_5 w_8 w_AA"]', (element) => {
    element.click();
  });
  await delay(5000);
};

// Funtion to sign in with a face account

const signIn = async (page) => {
  await delay(5000);
  await page.type('input[id="email-split-screen"], omairkh007@gmail.com');
  await delay(5000);
  await page.evaluate(() => {
    document.getElementsByClassName("button m-margin-top")[0].click();
  });
  await delay(5000);
  await page.type('input[id="sign-in-password-no-otp"],AIYexpertsolutions1');
  await delay(5000);
  await page.evaluate(() => {
    document.getElementsByClassName("button m-margin-top")[0].click();
  });
  await delay(5000);
};

// CheckOut and go to payment function

const checkOut = async () => {
  await delay(5000);
  await page.type('input[id="addressLineOne"], 501 Frederick Rd');
  await delay(5000);
  const input = await page.$("input[name='city']");
  await input.click({ clickCount: 3 });
  await input.type("Catonsville");
  await delay(5000);
  const input2 = await page.$("input[name='postalCode']");
  await input2.click({ clickCount: 3 });
  await input2.type("21228");
  await delay(5000);
  const input3 = await page.$("input[name='phone']");
  await input3.click({ clickCount: 3 });
  await input3.type("(717) 750-8296");
  await delay(5000);
};

// payment Function

const payment = async (page) => {
  const name = await page.$('input[id="react-aria-3"]');
  const lastname = await page.$('input[id="react-aria-4]');
  const cardNumber = await page.$('input[id="cc-number"]');
  const phoneNumber = await page.$('input[id="react-aria-8"]');
  const CVV = await page.$('input[id="react-aria-7"]');
  await name.type("Gilly");
  await delay(5000);
  await lastname.type("khoder");
  await delay(5000);
  await cardNumber.type("5179 9449 8420 9919");
  await delay(5000);
  await phoneNumber.type("(717) 750-8296");
  await delay(5000);
  await CVV.type("264");
  await delay(5000);
  await page.$eval('button[class="w_l w_n w_s f5 ph4-l"]', (element) => {
    element.click();
  });
};

const finishTask = async () => {
  const page = await initializeBrowser();
  await addToCart(page);
  await signIn(page);
  await checkOut(page);
  await payment(page);
};

finishTask();
