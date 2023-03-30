import {slack} from "../services/slack.js";
import channels from "../stores/channels.js";
export async function updateChannels() {
    try {
        const channelsList = await slack.client.conversations.list({
            types: "public_channel,private_channel,mpim,im",
        });
        await channels.actions.setChannels(channelsList.channels)
    }
    catch (error) {
        console.error(error);
        console.log(error)
    }
}

await updateChannels()
