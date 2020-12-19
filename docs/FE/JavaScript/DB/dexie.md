import Dexie from 'dexie'
const db = new Dexie('db')
const messages = [{
  msg_from: '辛弃疾',
  msg_to: '刘晓伦',
  msg: `醉里挑灯看剑，梦回吹角连营。 八百里分麾下炙， 五十弦翻塞外声， 沙场秋点兵。
    马作的卢飞快， 弓如霹雳弦惊。 了却君王天下事， 赢得生前身后名。 可怜白发生！`,
  create_time: new Date()
}, {
  msg_from: '李清照',
  msg_to: '刘晓伦',
  msg: `天接云涛连晓雾。 星河欲转千帆舞。 仿佛梦魂归帝所， 闻天语， 殷勤问我归何处。 我报路长嗟日暮， 学诗谩有惊人句。
    九万里风鹏正举。 风休住， 蓬舟吹取三山去！`,
  create_time: new Date()
}]

db.version(1).stores({
  message: '++, message_from, message_to,msg,create_time'
})
console.log('onload', db)

window.Dexie = async () => {
  const startTime = Date.now()
  console.log('onload', startTime)
  for (let i = 0; i < 10000; i++) {
    const index = i % 2
    await db.message.add(messages[index])
  }
  // let arr = await db.message.where("id").between(1000, 9000).delete()
  const endTime = Date.now()
  console.log('onload', endTime - startTime)
}