import _ from 'lodash';
import {
  TYPING_FIELD_UPDATE,
  MESSAGES_LOADED,
  SEND_MESSAGE } from '../actions/types';

const INITIAL_STATE = { messagesHistory: [], userMessage: '' };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TYPING_FIELD_UPDATE:
          return { ...state, userMessage: action.payload };
        case MESSAGES_LOADED: {
            const messagesHistoryArray = _.map(
                action.payload,
                (value, key) => {
                  return { ...value, timeStamp: key };
              }
            );
            const messagesHistoryArrayReversed = _.reverse(messagesHistoryArray);
            return { ...INITIAL_STATE, messagesHistory: messagesHistoryArrayReversed };
        }
        case SEND_MESSAGE:
          return { ...state, userMessage: '' };
        default:
          return INITIAL_STATE;
    }
};
