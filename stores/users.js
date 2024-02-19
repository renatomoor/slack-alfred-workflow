import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {downloadAndSaveImage} from "../scripts/downloadProfileImage.js";
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'users.json')

const adapter = new JSONFile(file)
const store = new Low(adapter)

await store.read()

store.data ||= {
    items: [],
}

const getEmoji = (unicode) => {
    const emoji = String.fromCodePoint(parseInt(unicode, 16));
    return JSON.stringify(emoji).slice(1, -1);
}

const getUserSubtitle = (user) => {
    let subtitle = ''
    if (user.real_name) {
        subtitle += user.real_name
    }

    if (user.profile.status_text !== '') {
        subtitle += ' - '
        if (user.profile.status_emoji_display_info &&
            user.profile.status_emoji_display_info.length > 0 &&
            user.profile.status_emoji_display_info[0].unicode) {
            subtitle += `${getEmoji(user.profile.status_emoji_display_info[0].unicode)}`
        }
        subtitle += ' ' + user.profile.status_text
    }

    return subtitle
}

const actions = {
    async setUsers(users) {
        let items = []

        users.forEach((user) => {
            user.title = user.profile.display_name === "" ? user.real_name : user.profile.display_name
            user.subtitle = getUserSubtitle(user)
            user.valid = !user.is_bot
            user.match = user.profile.real_name_normalized + ' ' + user.profile.display_name
            user.autocomplete = user.profile.display_name
            user.arg = `slack://user?team=${user.profile.team}&id=${user.id}`

            if (user.profile.image_original) {
                user.icon = {
                    path: downloadAndSaveImage(user.profile.image_192, './profile_images/')
                }
            }
            items.push(user)
        });

        store.data.items = items;
        await store.write()
    }
}

export default {
    actions
}
