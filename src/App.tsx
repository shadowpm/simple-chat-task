// import { useEffect, useState, ChangeEvent, FormEvent, useCallback } from "react";
// import MessageBox from "./components/ui/message-box/MessageBox";
// import { getMessages } from "./services/getMessages";
// import { Message } from "./types/message";
// import FixedInput from "./components/ui/fixed-input/FixedInput";
// import { sendMessage } from "./services/sendMessage";
// import { messageLimit } from "./configs";
// import { mergeMessages } from "./utilities/messages";
// import { reloadMessagesInterval } from "./configs";

// function App() {
//   const [newMessage, setNewMessage] = useState("");
//   const [allMessages, setAllMessages] = useState<Message[]>([]);
//   const [lastMessageIndex, setLastMessageIndex] = useState(-1);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getMessages();
//         setAllMessages(response);
//         setLastMessageIndex(response.length - 1);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const getMessagesPriodically = useCallback(async () => {
//     const messageTimestamp =
//       lastMessageIndex > -1 ? allMessages[lastMessageIndex].timestamp : 0;
//     const newMessages = await getMessages(messageTimestamp, Number(messageLimit));
//     //slice array at last message index timestamp
//     const originalPart = allMessages.slice(0, lastMessageIndex + 1)
//     const remaining = allMessages.slice(lastMessageIndex + 1, allMessages.length)

//     //merge new messages with the sliced part
//     const mergedMessages = mergeMessages(newMessages, remaining)
//     //set all messages witth the result
//     setAllMessages([...originalPart, ...mergedMessages]);
//     setLastMessageIndex(originalPart.length + newMessages.length - 1)
//   }, [allMessages, lastMessageIndex]);

//   useEffect(() => {
//     const interval = setInterval(getMessagesPriodically, Number(reloadMessagesInterval));

//     return () => clearInterval(interval);
//   }, [getMessagesPriodically])

//   const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
//     event?.preventDefault();
//     try {
//       const message = await sendMessage({
//         message: newMessage,
//         author: "Alice",
//       });
//       setAllMessages([...allMessages, message]);
//       setNewMessage("");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <div className="chat-container">
//         {allMessages.map((message) => (
//           <MessageBox
//             message={message.message}
//             senderName={message.author}
//             dateAndTime={message.timestamp.toString()}
//             isAdminMessage={message.author === "Alice"}
//           />
//         ))}
//       </div>
//       <FixedInput
//         enteredMessage={newMessage}
//         setEnteredMessage={(e: ChangeEvent<HTMLInputElement>) =>
//           setNewMessage(e.target.value)
//         }
//         onSend={handleSendMessage}
//       />
//     </div>
//   );
// }

// export default App;

// App.tsx

import { ChangeEvent, FormEvent } from "react";
import { useCustomState } from "./state-management/useCustomState";
import MessageBox from "./components/ui/message-box/MessageBox";
import FixedInput from "./components/ui/fixed-input/FixedInput";
import "./App.css";

function App() {
  const { newMessage, allMessages, setEnteredMessage, handleSendMessage } =
    useCustomState();

  return (
    <div>
      <div className="chat-container">
        {allMessages.map((message) => (
          <MessageBox
            key={message._id}
            message={message.message}
            senderName={message.author}
            dateAndTime={message.timestamp.toString()}
            isAdminMessage={message.author === "Alice"}
          />
        ))}
      </div>
      <FixedInput
        enteredMessage={newMessage}
        setEnteredMessage={(e: ChangeEvent<HTMLInputElement>) =>
          setEnteredMessage(e)
        }
        onSend={(e: FormEvent<HTMLFormElement>) => handleSendMessage(e)}
      />
    </div>
  );
}

export default App;
