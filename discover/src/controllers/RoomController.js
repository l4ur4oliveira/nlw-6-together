const { open } = require('sqlite');
const Database = require('../db/config');

module.exports = {
  enter(req, res) {
    const { roomId } = req.body;

    res.redirect(`/room/${roomId}`);
  },
  async create(req, res) {
    const db = await Database();
    const { password } = req.body;
    let roomId = '';
    let roomExist = true;

    while (roomExist) {
      for (let i = 0; i < 6; i++) {
        roomId += Math.floor(Math.random() * 10).toString();
      }

      const allRoomIds = await db.all(`SELECT id FROM rooms`);
      roomExist = allRoomIds.some(itemId => itemId === roomId);

      if (!roomExist) {
        await db.run(`INSERT INTO rooms (
          id,
          pass
        ) VALUES (
          ${parseInt(roomId)},
          ${password}
        )`);
      }
    }

    await db.close();

    res.redirect(`/room/${roomId}`);
  },
  async open(req, res) {
    const db = await Database();
    const roomId = req.params.id;

    const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 0`)
    const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 1`)

    res.render('room', { roomId, questions, questionsRead });
  }
}
