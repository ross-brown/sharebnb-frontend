import { useState, useEffect } from "react";
import { useCurrentUser } from "../contexts";
import ShareBnbApi from "../api/api";
import { MessageFormInterface, MessageInterface } from "../interfaces";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import Button from "../common/Button";

interface MessagesInterface {
    sent: MessageInterface[];
    received: MessageInterface[];
}

function MessagePage() {
    const [messages, setMessages] = useState<MessagesInterface>({ sent: [], received: [] });
    const [displayOutbox, setDisplayOutbox] = useState(false);
    const { currentUser } = useCurrentUser();

    useEffect(function getMessagesOnMount() {
        console.log("messages useeffect");
        getMessages();
    }, []);

    async function getMessages(): Promise<void> {
        if (currentUser) {
            const sentRes = ShareBnbApi.getSentMsgs(currentUser.username);
            const recdRes = ShareBnbApi.getRecvdMsgs(currentUser.username);
            const [sent, received] = await Promise.all([sentRes, recdRes]);
            setMessages({ sent, received });
        }
    }

    function toggleMessages() {
        setDisplayOutbox(display => !display);
    }

    async function send(formData: MessageFormInterface) {
        const message = await ShareBnbApi.sendMessage(formData);
        setMessages(m => ({ ...m, sent: [...m.sent, message] }));
    }

    return (
        <div className="grid lg:grid-cols-3">
            <div className="col-span-1 lg:border-r">
                <h2 className="text-xl my-4 font-bold text-neutral-800 text-center">Messages</h2>
                <div className="flex justify-around items-baseline pb-5 px-2 border-b">
                    <h3 className="text-xl font-semibold text-neutral-800">{displayOutbox ? "Outbox" : "Inbox"}</h3>
                    <Button color="neutral" onClick={toggleMessages}>
                        {displayOutbox ? " See Inbox" : "See Outbox"}
                    </Button>
                </div>
                <MessageList messages={displayOutbox ? messages.sent : messages.received} />
            </div>
            <div className="lg:col-span-2 my-20">
                <MessageForm send={send} />
            </div>
        </div>
    );
}

export default MessagePage;
