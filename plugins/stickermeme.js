const uploadImage = require('../lib/uploadImage')
const { sticker5 } = require('../lib/sticker')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [atas, bawah] = text.split`|`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `Resmi komutla yanıtlayın! *${usedPrefix + command} <${atas ? atas : 'top text'}>|<${bawah ? bawah : 'bottom text'}>*`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `Medya desteklenmiyor!`
    let img = await q.download()
    let url = await uploadImage(img)
    meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : '_')}/${encodeURIComponent(bawah ? bawah : '_')}.png?background=${url}`
    stiker = await sticker5(false, meme, packname, author)
    if (stiker) await conn.sendFile(m.chat, stiker, '', '', m, 0, { asSticker: true })
}
handler.help = ['stickermeme <top text>|<bottom text>']
handler.tags = ['sticker']
handler.command = /^(s(tic?ker)?meme)$/i

handler.limit = 1

module.exports = handler 
