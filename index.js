const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3040;

app.use(express.json({ extended: true }));
app.use('/api/test', require('./server/api.js'));

app.use(cors());

app.get('/src/style.css', function(req, res) {
    res.sendFile(__dirname + "/client/src/" + "style.css");
  });

  app.get('/src/script.js', function(req, res) {
    res.sendFile(__dirname + "/client/src/" + "script.js");
  });


app.get('/', (req, res) => {
    try {
        res.status(200).sendFile(__dirname + '/client/index.html');
    } catch(e) {
        res.status(400).json({error: e.message});
    }
});

app.listen(PORT, () => {
    console.log(`Server has started on the PORT ${PORT}`);
})