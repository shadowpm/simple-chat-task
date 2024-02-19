import { mergeMessages } from './mergeMessages';
import { Message } from '../types/message';

describe('mergeMessages function', () => {
  test('merges two arrays of messages without duplicates', () => {
    const messagesA: Message[] = [
      { _id: '1', message: 'Message 1', author: 'Author 1', timestamp: 123456789, token: 'token1' },
      { _id: '2', message: 'Message 2', author: 'Author 2', timestamp: 123456790, token: 'token2' },
    ];
    const messagesB: Message[] = [
      { _id: '3', message: 'Message 3', author: 'Author 3', timestamp: 123456791, token: 'token3' },
      { _id: '4', message: 'Message 4', author: 'Author 4', timestamp: 123456792, token: 'token4' },
    ];

    const mergedMessages = mergeMessages(messagesA, messagesB);

    // Expecting messages from both arrays to be present in the result
    expect(mergedMessages).toEqual([...messagesA, ...messagesB]);
  });

  test('handles arrays with duplicate messages', () => {
    const messagesA: Message[] = [
      { _id: '1', message: 'Message 1', author: 'Author 1', timestamp: 123456789, token: 'token1' },
      { _id: '2', message: 'Message 2', author: 'Author 2', timestamp: 123456790, token: 'token2' },
    ];
    const messagesB: Message[] = [
      { _id: '2', message: 'Updated Message 2', author: 'Author 2', timestamp: 123456791, token: 'token3' },
      { _id: '3', message: 'Message 3', author: 'Author 3', timestamp: 123456792, token: 'token4' },
    ];

    const mergedMessages = mergeMessages(messagesA, messagesB);

    // Expecting duplicate message '2' to be removed
    expect(mergedMessages).toEqual([
      { _id: '1', message: 'Message 1', author: 'Author 1', timestamp: 123456789, token: 'token1' },
      { _id: '2', message: 'Message 2', author: 'Author 2', timestamp: 123456790, token: 'token2' }, // Original 'Message 2'
      { _id: '3', message: 'Message 3', author: 'Author 3', timestamp: 123456792, token: 'token4' },
    ]);
  });
});
