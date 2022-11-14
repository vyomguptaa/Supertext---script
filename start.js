const fetch = require('node-fetch');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vyomgupta001@gmail.com',
        pass: password
    }
});

const mailOptions = {
    from: 'vyomgupta001@gmail.com',
    to: 'vyomgupta31@gmail.com',
    subject: 'Bot Engine Down',
    text: 'Bot Engine Down'
};
const mailOptions2 = {
    from: 'vyomgupta001@gmail.com',
    to: 'vyomgupta31@gmail.com',
    subject: 'Api Down',
    text: 'Api Down'
};


const checkBotEngine = async() => {
    const response = await fetch('https://chatclay.com/api/health');

    if (response.status !== 200) {
        transporter.sendMail(mailOptions2, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return;

    }

    const data = await response.json();
    if (data.mongo.state === 'down' || data.es.state === 'down' || data.redis.status === 'down' || data.convEngine.status === 'down' || data.sendbird.status === 'down') {
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

setInterval(checkBotEngine, 360000);