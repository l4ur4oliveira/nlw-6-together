module.exports = {
  index(req, res) {
    const { room, question, action } = req.params;
    const { password } = req.body;

    console.log(`
      Room: ${room}\n
      Question: ${question}\n
      Action: ${action}\n
      Pass: ${password}`
    );
  }
}
