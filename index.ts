

const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

//add env variables
require('dotenv').config();

const password = process.env.PASSWORD;



const url = 'https://chat.chatclay.com/app/5f20b9c83b820631fdb738eb';

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
    if (response.status() === 400 || response.status() === 500) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    
    }
    //elseif status code is 304 or 200 the log server is up
    else if(response.status() === 304 || response.status() === 200){
        console.log('Server is up and running');
    }
    else {
        console.log('error');
    }


    await browser.close();
})();

