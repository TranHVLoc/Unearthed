import express from "express";

// Initialize the express app
const app = express();

// To serve the files from the client\public directory,
// define a middleware function to serve static files from
// the public directoryz
app.use('/public', express.static('./public'));
app.use('/scripts', express.static('./public/scripts'));

// Define a route for the root URL of the server with parameters res and req
// and send a response with the status code 200
app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top= 50px;">UnEarthed API</h1>');
});

const PORT = process.env.PORT || 3001

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});