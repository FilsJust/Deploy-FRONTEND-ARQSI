//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('/dist/stock-and-closet-front-end'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join('/dist/stock-and-closet-front-end/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);