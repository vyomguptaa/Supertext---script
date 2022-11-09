const cron = require('node-cron');
const { exec } = require('child_process');

//1 hour
cron.schedule('0 */1 * * *', () => {
    exec('node index.ts', (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(stdout);
    });
});

