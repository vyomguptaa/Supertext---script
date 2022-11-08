

const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

const url = 'https://chat.chatclay.com/app/5f20b9c83b820631fdb738eb';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your email',
        pass: 'APP password (it is different from the regular password)'
    }
});

const mailOptions = {
    from: 'sender email',
    to: 'receiver email',
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

