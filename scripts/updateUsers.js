import {slack} from "../services/slack.js";
import users from "../stores/users.js";

export async function updateUsers() {
    try {
        let usersList = [];
        let cursor = undefined;

        while (true) {
            const result = await slack.client.users.list({
                cursor: cursor,
                limit: 1000 // maximum allowed by Slack API
            });

            usersList = usersList.concat(result.members);

            if (!result.response_metadata || !result.response_metadata.next_cursor) {
                break;
            }

            cursor = result.response_metadata.next_cursor;
        }
        
        await users.actions.setUsers(usersList)
    }
    catch (error) {
        console.error(error);
    }
}

await updateUsers()