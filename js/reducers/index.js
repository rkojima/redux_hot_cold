import * as actions from '../actions/index';

// Initial game state: Need numberToGuess, number of guesses=0, whether guessed correctly=false, 

function createGame() {
    return {
        guess: 0,
        guessFeedback: "", 
        numbersGuessed: [],
        mysteryNumber: (Math.floor(Math.random() * 100) + 1),
        guessedAlready: false,
        isSolved: false,
        fewestGuesses: null,
    }
}

const initialGameState = createGame();

export const repositoryReducer = (state = initialGameState, action) => {
    
    if (action.type === 'CREATE_GAME') {
        return createGame();
    }

    else if (action.type === 'GUESS_NUMBER') {
        // check if value submitted is number
        const solved = (parseInt(action.guess) === state.mysteryNumber);
        const triedGuess = state.numbersGuessed.includes(action.guess);
        const guesses = triedGuess ? state.numbersGuessed : state.numbersGuessed.concat(action.guess);
        let temp = "";
        if (Math.abs(action.guess - state.mysteryNumber) < 10) {
            temp = "hot";
        }
        else if (Math.abs(action.guess - state.mysteryNumber) < 20) {
            temp = "somewhat hot";
        }
        else {
            temp = "cold";
        }
        let newState = Object.assign({}, state, {
            guess: parseInt(action.guess), 
            numbersGuessed: guesses,
            isSolved: solved,
            guessedAlready: triedGuess,
            guessFeedback: temp,
        });
        console.log(newState);
        return newState;
        // Add to number of guesses
        // Compare guess to mystery number
        // If guess is same as mystery number, game stops
        // If not, add number to numbersGuessed
    }

    else if (action.type === actions.SAVE_FEWEST_GUESSES_SUCCESS) {
        let newState = Object.assign({}, state, {
            fewestGuesses: action.numberOfGuesses,
        });
        console.log(newState);
        return newState;
    }

    else if (action.type === actions.SAVE_FEWEST_GUESSES_NOPE) {
        return state;
    }

    else if (action.type === actions.SAVE_FEWEST_GUESSES_ERROR) {
        return state;
    }    

    // else if (action.type === actions.FETCH_FEWEST_GUESSES_SUCCESS) {
         
    // }

    // else if (action.type === actions.FETCH_FEWEST_GUESSES_ERROR) {

    // }

    // else if (action.type === actions.SAVE_FEWEST_GUESSES_SUCCESS) {
    //     // Don't do action.numbersGuessed if action doesn't intake numbersGuessed
    //     if (state.numbersGuessed.length < state.fewestGuesses) {

    //     }
    // }

    // else if (action.type === actions.SAVE_FEWEST_GUESSES_ERROR) {

    // }
}