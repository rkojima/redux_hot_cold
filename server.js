const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

//Available for the whole app, as opposed to res.locals
//null is explicit undefined, rather than implicite undefined
app.locals.fewestGuesses = null; 

// when the root of this router is called with GET, return
// all current ShoppingList items
app.get('/fewest-guesses', (req, res) => {
    res.json(app.locals.fewestGuesses)
});

app.post('/fewest-guesses', jsonParser, (req, res) => {
    console.log("req.body: " + req.body);
    if (!app.locals.fewestGuesses || req.body < app.locals.fewestGuesses) {
        app.locals.fewestGuesses = req.body;
        res.send("Record updated");
    }

    else {
        res.send("Record not updated");
    }
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
