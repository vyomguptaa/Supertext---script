//scheduled to run automatically after every 1 hour


const cron = require('node-cron');
const { exec } = require('child_process');

cron.schedule('0 */1 * * *', () => {
    exec('node index.ts', (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(stdout);
    });
});
