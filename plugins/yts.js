let yts = require('yt-search')

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Use:\n${usedPrefix + command} <text>\n\nÖrnek:\n${usedPrefix + command}Laçin Eke YouTube`
  let results = await yts(text)
  let teks = results.all.map(v => {
    switch (v.type) {
      case 'video': return `
*${v.title}* (${v.url})
Süre: ${v.timestamp}
Yüklenme tarihi ${v.ago}
${v.views} İzlenme sayısı
      `.trim()
      case 'kanal': return `
*${v.name}* (${v.url})
_${v.subCountLabel} (${v.subCount}) Abone_
${v.videoCount} video
`.trim()
    }
  }).filter(v => v).join('\n========================\n')
  m.reply(teks)
}
handler.help = ['', 'earch'].map(v => 'yts' + v + ' <pencarian>')
handler.tags = ['internet']
handler.command = /^yts(earch)?$/i

module.exports = handler
