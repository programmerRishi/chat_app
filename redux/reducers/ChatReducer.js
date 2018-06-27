import _ from 'lodash';
import {
  FINAL_MESSAGES,
  TYPING_FIELD_UPDATE,
  MESSAGES_LOADED,
  DELETED_MESSAGES_LOADED,
  SEND_MESSAGE } from '../actions/types';

const INITIAL_STATE = { oldMessagesHistory: '', messagesHistory: null, userMessage: '', deletedMessagesHistory: '', showActivityIndicator: 'true' };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TYPING_FIELD_UPDATE:
          return { ...state, userMessage: action.payload };

        case DELETED_MESSAGES_LOADED : {
          if (action.payload !== null) {
            const deletedMessagesHistory = _.map(action.payload, value => ({ ...value }));
            console.log(deletedMessagesHistory, 'deletedMessagesHistory');
            return { ...state, deletedMessagesHistory };
          }
          return { ...state, deletedMessagesHistory: null };
        }

        case MESSAGES_LOADED: {
          if (action.payload !== null) {
            const oldMessagesHistory = _.map(
                action.payload,
                (value, key) => {
                  return { ...value, timeStamp: key };
              }
            );
            _.reverse(oldMessagesHistory);
            console.log(oldMessagesHistory, 'oldMessagesHistory');
            return { ...state, oldMessagesHistory };
          }
          return { ...state, oldMessagesHistory: null };
        }

        case FINAL_MESSAGES:
          return { ...state, messagesHistory: action.payload, showActivityIndicator: false };

        case SEND_MESSAGE:
          return { ...state, userMessage: '' };

        default:
          return state;
    }
};
