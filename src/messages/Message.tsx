import { MessageInterface } from "../interfaces";


function Message({ id, sender, recipient, body, sentAt }: MessageInterface) {


  const formattedData = new Date(sentAt).toLocaleString();

  return (
    <div>
      <b>{sender}</b> <small>{formattedData}</small>
      <p>{body}</p>
    </div>
  );
}

export default Message;
