import { useContext, useState, useEffect } from "react";
import { UserContext } from "./contexts";
import ShareBnbApi from "./api/api";
import { MessageInterface } from "./interfaces";

interface MessagesInterface {
    sent: MessageInterface[];
    received: MessageInterface[];
}

function MessagePage() {
    const [messages, setMessages] = useState<MessagesInterface>({ sent: [], received: [] });
    const { currentUser } = useContext(UserContext);

    useEffect(function getMessagesOnMount() {
        console.log("messages useeffect");
        getMessages();
    }, []);

    async function getMessages(): Promise<void> {
        if (currentUser) {
            const sentRes = ShareBnbApi.getSentMsgs(currentUser.username);
            const recdRes = ShareBnbApi.getSentMsgs(currentUser.username);
            const [sent, received] = await Promise.all([sentRes, recdRes]);
            setMessages({ sent, received });

        }
    }

    return <></>;
}

export default MessagePage;