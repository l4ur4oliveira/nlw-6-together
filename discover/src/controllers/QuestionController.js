const Database = require('../db/config');

module.exports = {
  async index(req, res) {
    const db = await Database();
    const { room, question, action } = req.params;
    const { password } = req.body;

    const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${room}`);
    if (verifyRoom.pass === password) {
      if (action === 'delete') {

        await db.run(`DELETE FROM questions WHERE id = ${question}`);

      } else if (action === 'check') {

        await db.run(`UPDATE questions SET read = 1 WHERE id = ${question}`);

      }

      await db.close();

      res.redirect(`/room/${room}`);
    } else {
      res.render('unauthorized', { message: 'Senha incorreta', location: `/room/${room}` });
    }
  },
  async create(req, res) {
    const db = await Database();
    const { question } = req.body;
    const roomId = req.params.room;

    await db.run(`INSERT INTO questions (
      title,
      read,
      room
    ) VALUES (
      "${question}",
      0,
      ${roomId}
    )`);

    await db.close();

    res.redirect(`/room/${roomId}`);
  }
}
