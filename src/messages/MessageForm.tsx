import { useState } from "react";
import { MessageFormInterface } from "../interfaces";
import Alert from "../common/Alert";
import { getErrorMsg } from "../utils";
import { Spinner } from "../common/Spinner";
import sendIcon from "../assets/img/send-message.svg";
import Button from "../common/Button";

interface MessageFormProps {
  send: (formData: MessageFormInterface) => Promise<void>;
}


function MessageForm({ send }: MessageFormProps) {
  const initialFormData = {
    recipient: "",
    body: ""
  };
  const [formData, setFormData] = useState<MessageFormInterface>(initialFormData);
  const [formErrors, setFormErrors] = useState<string[][] | string[]>([]);
  const [hasSent, setHasSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  function handleChange(evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData, [name]: value
    }));
  }

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    setFormErrors([]);
    setHasSent(false);
    setIsSending(true);
    try {
      await send(formData);
      setFormData(initialFormData);
      setHasSent(true);
      setIsSending(false);
    } catch (errors) {
      const messages = getErrorMsg(errors);
      setFormErrors(messages);
      setIsSending(false);
    }
  }

  function isFormFilledOut() {
    return Object.values(formData).every(val => val.trim());
  }

  return (
    <div>
      <form className="border-2 max-w-xl mx-auto p-8 bg-neutral-200 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h3 className="mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-800">
          Send a message
        </h3>
        <div className="mb-4">
          <label className="block text-sm text-neutral-900 font-medium leading-6" htmlFor="recipient">
            To (Username):
          </label>
          <div className="mt-2">
            <input
              id="recipient"
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-neutral-900 font-medium leading-6" htmlFor="body">
            Message body:
          </label>
          <div className="mt-2">
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              required
              placeholder="Type a message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline">
            </textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <Button color="green" disabled={!isFormFilledOut() || isSending}>
            <div className="flex items-center">
              <img src={sendIcon} className="w-5 h-5" />
              <span className="ps-3">Send Message</span>
            </div>
          </Button>
        </div>
        {isSending &&
          <div className="flex justify-center m-6 font-semibold text-xl">
            <div role="status">
              <Spinner size="lg" />
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
        {formErrors.length > 0 && <Alert messages={formErrors} />}
        {hasSent && <Alert type="success" messages={["Message sent"]} />}
      </form>
    </div>
  );
}

export default MessageForm;
