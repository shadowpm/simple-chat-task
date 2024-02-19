import { htmlDecode } from "../../../utilities/htmlDecoder";
import { formatTimestamp } from "../../../utilities/timestampConvertor";
import "./styles.css";

interface Props {
  senderName?: string;
  message: string;
  dateAndTime: string;
  hasError?: boolean;
  isAdminMessage?: boolean;
}

const MessageBox: React.FC<Props> = ({
  senderName,
  message,
  dateAndTime,
  isAdminMessage,
}) => {
  const messageContainer = `message-container ${isAdminMessage ? "admin" : ""}`;
  const messageDirection = `direction ${isAdminMessage ? "admin" : ""}`;

  return (
    <div className={messageDirection}>
      <div className={messageContainer}>
        {!isAdminMessage && senderName && (
          <div className="sender-name" data-testid="senderName">
            {senderName.charAt(0).toUpperCase() + senderName.slice(1)}
          </div>
        )}
        <div data-testid="decodedMessage">{htmlDecode(message)}</div>
        <div className="date-and-time" data-testid="dateAndTime">
          {formatTimestamp(Number(dateAndTime))}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
