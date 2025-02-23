let handler = m => m

handler.before = async function (m) {
    let chat = db.data.chats[m.chat]
    if (m.isGroup && chat.groupTime != 0) {
        if (new Date() * 1 >= chat.groupTime) {
            await this.reply(m.chat, `Zaman *${this.user.name}* gruptan ayrılmak, teşekkür ederim`)
            chat.welcome = false
            this.groupLeave(m.chat)
            chat.groupTime = 0
            this.modifyChat(m.chat, 'delete').catch(_ => _)
        }
    }
}

module.exports = handler
