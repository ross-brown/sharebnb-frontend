import { MessageInterface } from "../interfaces";


function Message({ id, sender, recipient, body, sentAt }: MessageInterface) {


  const formattedData = new Date(sentAt).toLocaleString();

  return (
    <div className="p-8 border-b">
      <div className="flex justify-between items-baseline">

      <p className="font-semibold inline text-neutral-800">{sender}</p>
      <p className="text-sm inline text-neutral-600">{formattedData}</p>
      </div>
      <p className="text-neutral-700 font-medium">{body}</p>
    </div>
  );
}

export default Message;
