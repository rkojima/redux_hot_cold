require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import * as actions from './actions/index';
import store from './store';
import Game from './components/game';

store.dispatch(actions.createGame());

document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(
        <Provider store={store}>
            <Game />
        </Provider>, 
        document.getElementById('app'))
);