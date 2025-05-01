const expresss = require('express');
const app = express();
const items = require('./fakeDB');

app.listen(4000, () => {
    console.log('Server is running on port 4000')
});

app.get('/items', (req, res) => {
    res.json(items);
});

