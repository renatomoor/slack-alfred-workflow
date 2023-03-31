import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'channels.json')

const adapter = new JSONFile(file)
const store = new Low(adapter)

await store.read()

store.data ||= {
    items: [],
}

const getMatchText = (channel) => {
    let text = channel.name
    if (channel.purpose.value) {
        text += ' ' + channel.purpose.value
    }
    if (channel.previous_names) {
        text += ' ' + channel.previous_names.join(' ')
    }
    return text;
}

const actions = {
    async setChannels(channels) {
        let items = [];
        channels.forEach((channel) => {
            if (channel) {
                channel.title = channel.name;
                channel.valid = !channel.is_archived;
                channel.autocomplete = channel.name;
                channel.arg = `slack://channel?team=${channel.context_team_id}&id=${channel.id}`
                if (channel.purpose) {
                    channel.subtitle = channel.purpose?.value || '';
                    channel.match = getMatchText(channel);
                }
                items.push(channel)
            }
        });
        store.data.items = items
        await store.write()
    }
}

export default {
    actions
}
