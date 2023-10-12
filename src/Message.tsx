import { MessageInterface } from "./interfaces";


function Message({ id, sender, recipient, body, sentAt }: MessageInterface) {

  return (
    <div>
      <p>{sender} - {body}</p>
      <small>sent at: {sentAt}</small>
    </div>
  );
}

export default Message;
