import { useContext } from "react";
import { MessageInterface } from "../interfaces";
import { UserContext } from "../contexts";


function Message({ sender, recipient, body, sentAt }: MessageInterface) {
  const { currentUser } = useContext(UserContext);
  if (currentUser?.username === sender) {
    sender = "You";
  }

  const formattedDate = new Date(sentAt).toLocaleString();


  return (
    <div className="p-8 border-b">
      {sender === "You"
        && <p className="text-sm">To: <span className="text-sm font-bold text-neutral-800">{recipient}</span></p>}
      <div className="flex justify-start gap-3 items-baseline">
        <p className="font-bold inline text-neutral-800">{sender}</p>
        <p className="text-xs inline text-neutral-600">{formattedDate}</p>
      </div>
      <p className="text-neutral-700">{body}</p>
    </div>
  );
}

export default Message;
