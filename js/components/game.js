import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.guess = this.guess.bind(this);
        this.newGame = this.newGame.bind(this);
        this.checkFewestGuesses = this.checkFewestGuesses.bind(this);
    }

    guess(e) {
        e.preventDefault();
        const guessValue = parseInt(this.userGuess.value);
        this.props.dispatch(actions.guessNumber(guessValue));
        document.getElementById("guess-text").value = "";
    }

    newGame() {
        this.props.dispatch(actions.createGame());
    }

    checkFewestGuesses(guesses) {
        this.props.dispatch(actions.checkSaveFewestGuesses(guesses));
    }

    render() {
        const guessedAlreadyMessage = (this.props.guessedAlready) ? (<h4>Already guessed the number</h4>) : "";
        const correctAnswer = (this.props.isSolved) ? (<h3>You won! Click "New Game" to play again</h3>) : "";
        if (this.props.isSolved) {
            this.checkFewestGuesses(this.props.numbersGuessed.length);
        }
        return (
            <div>
                <button type="button" onClick={this.newGame}>New Game</button>
                <form onSubmit={this.guess}>
                    <h3>Guess the number (from 1 to 100)</h3>
                    <h3>Fewest guesses has been: {this.props.fewestGuesses}</h3>
                    {correctAnswer}
                    <h4>Your number is: {this.props.feedback}</h4>
                    {guessedAlreadyMessage}
                    <input type="number" ref={ref => this.userGuess = ref} placeholder="Guess number here" id="guess-text" required/>
                    <button type="button" onClick={this.guess}>Submit</button>
                    <h4>{this.props.numbersGuessed.join(' ')}</h4>
                </form>

            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    guess: state.guess,
    feedback: state.guessFeedback,
    guessedAlready: state.guessedAlready,
    numbersGuessed: state.numbersGuessed,
    isSolved: state.isSolved,
    fewestGuesses: state.fewestGuesses,
})

export default connect(mapStateToProps)(Game)