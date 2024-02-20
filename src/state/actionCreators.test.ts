import { createSentMessage, createReceivedMessages } from './actionCreators';
import { Message } from '../types/message';
import { ActionType } from './actionTypes';

describe('Action Creators', () => {
  describe('createSentMessage', () => {
    it('should create an action for MESSAGE_SENT', () => {
      const message: Message = {
        _id: '1',
        message: 'Hello',
        author: 'John',
        timestamp: 1234567890,
        token: 'yourToken',
      };

      const action: ActionType = createSentMessage(message);

      expect(action.type).toEqual('MESSAGE_SENT');
      expect(action.payload).toEqual(message);
    });
  });

  describe('createReceivedMessages', () => {
    it('should create an action for RECEIVE_MESSAGES', () => {
      const messages: Message[] = [
        {
          _id: '1',
          message: 'Hello',
          author: 'John',
          timestamp: 1234567890,
          token: 'yourToken1',
        },
        {
          _id: '2',
          message: 'Hi',
          author: 'Jane',
          timestamp: 1234567891,
          token: 'yourToken2',
        },
      ];

      const action: ActionType = createReceivedMessages(messages);

      expect(action.type).toEqual('RECEIVE_MESSAGES');
      expect(action.payload).toEqual(messages);
    });
  });
});
