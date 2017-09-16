

import { combineReducers } from 'redux';
import user from './user';
import art from './art';
import learn from './learn';
import board from './board';

export default combineReducers({
  user, art, learn, board
});
