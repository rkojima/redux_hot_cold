import 'isomorphic-fetch'; 

export const GUESS_NUMBER = 'GUESS_NUMBER';
export const guessNumber = guess => ({
    type: GUESS_NUMBER,
    guess
});

export const GIVE_FEEDBACK = 'GIVE_FEEDBACK';
export const giveFeedback = (guess, feedback) => ({
    type: GIVE_FEEDBACK,
    guess,
    feedback
})

export const CREATE_GAME = 'CREATE_GAME';
export const createGame = () => ({
    type: CREATE_GAME,
})

// export const FETCH_FEWEST_GUESSES = 'FETCH_FEWEST_GUESSES';
// export const fetchFewestGuesses = (guesses) => ({
//     type: FETCH_FEWEST_GUESSES,
//     guesses
// });

// export const FETCH_FEWEST_GUESSES_SUCCESS = 'FETCH_FEWEST_GUESSES_SUCCESS';
// export const fetchFewestGuessesSuccess = (guesses) => ({
//     type: FETCH_FEWEST_GUESSES_SUCCESS,
//     guesses
// });

// export const FETCH_FEWEST_GUESSES_ERROR= 'FETCH_FEWEST_GUESSES_ERROR';
// export const fetchFewestGuessesError = (guesses) => ({
//     type: SAVE_FEWEST_GUESSES_ERROR,
//     guesses
// });

export const SAVE_FEWEST_GUESSES = 'SAVE_FEWEST_GUESSES';
export const saveFewestGuesses = (numberOfGuesses) => ({
    type: SAVE_FEWEST_GUESSES,
    numberOfGuesses
});

export const SAVE_FEWEST_GUESSES_SUCCESS = 'SAVE_FEWEST_GUESSES_SUCCESS';
export const saveFewestGuessesSuccess = (numberOfGuesses) => ({
    type: SAVE_FEWEST_GUESSES_SUCCESS,
    numberOfGuesses
});

export const SAVE_FEWEST_GUESSES_NOPE = 'SAVE_FEWEST_GUESSES_NOPE';
export const saveFewestGuessesNope = () => ({
    type: SAVE_FEWEST_GUESSES_NOPE,
});

export const SAVE_FEWEST_GUESSES_ERROR = 'SAVE_FEWEST_GUESSES_ERROR';
export const saveFewestGuessesError = (error) => ({
    type: SAVE_FEWEST_GUESSES_ERROR,
    error
});

export function checkSaveFewestGuesses(guesses) {
    return function (dispatch) {
        // dispatch(saveFewestGuesses(guesses))

        var payload = {
            numberGuesses: guesses,
        };

        // var data = new FormData();
        // data.append("json", JSON.stringify(payload));
    // console.log(JSON.stringify(payload));

        return fetch("http://localhost:5000/fewest-guesses", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(payload)
        })
        .then(
            response => response.json()
        )
        .then(
            data => {
                if(data.isRecordUpdated === true) {
                    dispatch(saveFewestGuessesSuccess(data.fewestGuesses));
                }
                else if (data === false) {
                    dispatch(saveFewestGuessesNope());
                }
            error => dispatch(saveFewestGuessesError(error));
            }
        );
    }
};