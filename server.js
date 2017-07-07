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
    if (!app.locals.fewestGuesses || req.body.numberGuesses < app.locals.fewestGuesses) {
        app.locals.fewestGuesses = req.body.numberGuesses;
        res.json({
            isRecordUpdated: true,
            fewestGuesses: app.locals.fewestGuesses,
        });
    }

    else {
        res.json({
            isRecordUpdated: false
        });
    }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 5000}`);
});
