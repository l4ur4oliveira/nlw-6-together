const { open } = require('sqlite');
const Database = require('../db/config');

module.exports = {
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

    const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 0`);
    const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 1`);
    let noQuestions = false;

    if (questions.length === 0 && questionsRead.length === 0) {
      noQuestions = true;
    }

    res.render('room', { roomId, questions, questionsRead, noQuestions });
  },
  async enter(req, res) {
    const db = await Database();
    const { roomId } = req.body;

    const room = await db.all(`SELECT * FROM rooms WHERE id = ${roomId}`);

    if(room.length !== 0) {
      // 491557
      res.redirect(`/room/${roomId}`);
    } else {
      res.render('unauthorized', { message: 'Sala não existe', location: `/` });
    }
  }
}
