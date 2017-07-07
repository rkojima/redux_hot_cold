const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));
app.use(cors());

//Available for the whole app, as opposed to res.locals
//null is explicit undefined, rather than implicite undefined
app.locals.fewestGuesses = null; 

// when the root of this router is called with GET, return
// all current ShoppingList items
app.get('/fewest-guesses', (req, res) => {
    res.json(app.locals.fewestGuesses)
});

app.post('/fewest-guesses', jsonParser, (req, res) => {
    console.log(req.body);
    if (!app.locals.fewestGuesses || req.body < app.locals.fewestGuesses) {
        console.log("I was here");
        app.locals.fewestGuesses = req.body.numberGuesses;
        console.log(app.locals.fewestGuesses);
        res.send("Record updated");
    }

    else {
        res.send("Record not updated");
    }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 5000}`);
});
