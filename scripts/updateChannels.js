import {slack} from "../services/slack.js";
import channels from "../stores/channels.js";

export async function updateChannels() {
    try {
        let channelsList = [];
        let cursor = undefined;

        while (true) {
            const result = await slack.client.conversations.list({
                types: "public_channel,private_channel,mpim,im",
                cursor: cursor,
                limit: 1000 // maximum allowed by Slack API
            });

            channelsList = channelsList.concat(result.channels);

            if (!result.response_metadata || !result.response_metadata.next_cursor) {
                break;
            }

            cursor = result.response_metadata.next_cursor;
        }

        await channels.actions.setChannels(channelsList)
    }
    catch (error) {
        console.error(error);
        console.log(error)
    }
}

await updateChannels()