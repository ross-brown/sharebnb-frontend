import { useContext, useState, useEffect } from "react";
import { UserContext } from "./contexts";
import ShareBnbApi from "./api/api";
import { MessageInterface } from "./interfaces";
import MessageList from "./MessageList";

interface MessagesInterface {
    sent: MessageInterface[];
    received: MessageInterface[];
}

function MessagePage() {
    const [messages, setMessages] = useState<MessagesInterface>({ sent: [], received: [] });
    const [displayOutbox, setDisplayOutbox] = useState(false);
    const { currentUser } = useContext(UserContext);

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

    return (
        <div>
            <h2>Messages</h2>
            <h3>{displayOutbox ? "Outbox" : "Inbox"}</h3>
            <div>
                <MessageList messages={displayOutbox ? messages.sent : messages.received} />
            </div>
            <button onClick={toggleMessages}>
                {displayOutbox ? " See Inbox" : "See Outbox"}
            </button>
        </div>
    );
}

export default MessagePage;
