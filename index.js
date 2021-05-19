const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const plainText = 'ReskillAmericans123';

const hashedPass = bcrypt.hashSync(plainText, saltRounds);

app.use(express.json());

app.post('/pass', async (req, res) => {
  try {
    const { pass } = req.body;

    if (!pass)
      return res.status(400).json({ message: 'Please provide password' });

    const passComparison = await bcrypt.compare(pass, hashedPass);

    res.status(200).json({
      status: 'success',
      data: {
        results: passComparison,
      },
    });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
