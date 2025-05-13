const express = require('express');
const morgan = require('morgan');
const items = require('./fakeDB');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  items.push(req.body);
  res.status(201).json({ added: req.body });
});

app.get('/items/:name', (req, res) => {
  const name = req.params.name;
  const item = items.find(item => item.name === name);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(item);
});

app.patch('/items/:name', (req, res) => {
  const name = req.params.name;
  const item = items.find(item => item.name === name);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  const { name: newName, price } = req.body;
  if (newName !== undefined) item.name = newName;
  if (price !== undefined) item.price = price;
  res.json({ updated: item });
});

app.delete('/items/:name', (req, res) => {
    console.log("DELETE route hit for:", req.params.name);
    res.json({ message: "hello from DELETE" });
  });
  

// app.delete('/items/:name', (req, res) => {
//   console.log("DELETE route hit!");
//   const name = req.params.name;
//   const index = items.findIndex(item => item.name === name);
//   if (index === -1) {
//     return res.status(404).json({ error: "Item not found" });
//   }
//   items.splice(index, 1);
//   res.json({ message: "Deleted" });
// });

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
