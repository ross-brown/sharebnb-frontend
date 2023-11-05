import Message from "./Message";
import { MessageInterface } from "../interfaces";

interface MessageListProps {
  messages: MessageInterface[];
}

function MessageList({ messages }: MessageListProps) {


  if (messages.length === 0) {
    return "No messages here...";
  }


  return (
    <div className="flex flex-col">
      {messages.map(m => (
        <Message
          key={m.id}
          id={m.id}
          sender={m.sender}
          recipient={m.recipient}
          body={m.body}
          sentAt={m.sentAt} />
      ))}
    </div>
  );
}

export default MessageList;
