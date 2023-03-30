import pkg from '@slack/bolt';
const { App } = pkg;

const slack = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

export {
    slack
}
