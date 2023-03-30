import {slack} from "../services/slack.js";
import users from "../stores/users.js";
export async function updateUsers() {
    try {
        const usersList = await slack.client.users.list();
        await users.actions.setUsers(usersList.members)
    }
    catch (error) {
        console.error(error);
    }
}

await updateUsers()
