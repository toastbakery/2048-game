import express from 'express';

const app = express();
const port = 3000;

// Serve static files from the root directory
/*
This is necessary because when a client (such as a web browser) requests a file like style.css or dist/script.js, 
the server needs to know where to find these files and how to serve them.
*/
app.use(express.static('.'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: '.' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
