import { render, screen, fireEvent } from "@testing-library/react";
import FixedInput from "./FixedInput";

describe("FixedInput component", () => {
  test("renders correctly", () => {
    const mockSetEnteredMessage = jest.fn();
    const mockOnSend = jest.fn();

    render(
      <FixedInput
        enteredMessage="Test Message"
        setEnteredMessage={mockSetEnteredMessage}
        onSend={mockOnSend}
      />,
    );

    const inputElement = screen.getByPlaceholderText(
      /Message/i,
    ) as HTMLInputElement;
    expect(inputElement.value).toBe("Test Message");
  });

  test("calls onSend when the form is submitted", () => {
    const mockSetEnteredMessage = jest.fn();
    const mockOnSend = jest.fn();

    render(
      <FixedInput
        enteredMessage=""
        setEnteredMessage={mockSetEnteredMessage}
        onSend={mockOnSend}
      />,
    );

    const formElement = screen.getByTestId("messageForm");

    fireEvent.submit(formElement);

    expect(mockOnSend).toHaveBeenCalledTimes(1);
  });
});
