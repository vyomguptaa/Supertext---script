

const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

//add env variables
require('dotenv').config();

const password = process.env.PASSWORD;



const url = 'https://www.google.com';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vyomgupta001@gmail.com',
        pass:  password
    }
});

const mailOptions = {
    from: 'vyomgupta001@gmail.com',
    to: 'vyomgupta31@gmail.com',
    subject: 'Server is Down',
    text: 'Please check and try to get it back as soon as possible'
};

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const response = await page.goto(url);
    if (response.status() === 200) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    await browser.close();
})();

