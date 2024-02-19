import { render, screen } from '@testing-library/react';
import MessageBox from './MessageBox';

describe('MessageBox component', () => {
  test('renders message, date, and time correctly', () => {
    const props = {
      senderName: 'John',
      message: '&lt;div&gt;Hello&lt;/div&gt;',
      dateAndTime: '1644892800000',
      isAdminMessage: false,
    };

    render(<MessageBox {...props} />);

    const senderNameElement = screen.getByTestId('senderName');
    const decodedMessageElement = screen.getByTestId('decodedMessage');
    const dateAndTimeElement = screen.getByTestId('dateAndTime');

    expect(senderNameElement).toBeInTheDocument();
    expect(decodedMessageElement).toBeInTheDocument();
    expect(dateAndTimeElement).toBeInTheDocument();
  });

  test('renders admin message correctly', () => {
    const props = {
      message: 'This is an admin message.',
      dateAndTime: '1644892800000',
      isAdminMessage: true,
    };

    render(<MessageBox {...props} />);

    const adminMessageElement = screen.getByTestId('decodedMessage');

    expect(adminMessageElement).toBeInTheDocument();
  });

  test('handles missing senderName correctly', () => {
    const props = {
      message: 'Hello from the sender!',
      dateAndTime: '1644892800000',
      isAdminMessage: false,
    };

    render(<MessageBox {...props} />);

    const senderNameElement = screen.queryByTestId('senderName');

    expect(senderNameElement).not.toBeInTheDocument();
  });
});
