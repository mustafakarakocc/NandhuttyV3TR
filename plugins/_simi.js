let fetch = require('node-fetch')

let handler = m => m

handler.before = async (m) => {
    let chat = db.data.chats[m.chat]
    if (chat.simi && !chat.isBanned) {
        if (/^.*false|disable|(turn)?off|0/i.test(m.text)) return
        if (!m.text) return
        let res = await fetch(API('https://api.simsimi.net', '/v2/', { text: encodeURIComponent(m.text), lc: 'id' }))
        if (!res.ok) return m.reply(eror)
        let json = await res.json()
        if (json.success == "Ne dediğini anlamıyorum. Lütfen bana öğret.") return m.reply('simdi bilmiyorum kardeşim.')
        m.reply(json.success)
        return !0
    }
    return !0
}

module.exports = handler
