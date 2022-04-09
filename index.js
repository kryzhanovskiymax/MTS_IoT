const express = require('express');
const app = express();

const PORT = process.env.PORT || 3040;

app.use(express.json({ extended: true }));
app.use('/api/test', require('./server/api.js'));

app.listen(PORT, () => {
    console.log(`Server has started on the PORT ${PORT}`);
})