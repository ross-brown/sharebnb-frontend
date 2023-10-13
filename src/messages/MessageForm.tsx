import { useState } from "react";
import { MessageFormInterface } from "../interfaces";

interface MessageFormProps {
  send: (formData: MessageFormInterface) => Promise<void>;
}


function MessageForm({ send }: MessageFormProps) {
  const initialFormData = {
    recipient: "",
    body: ""
  };
  const [formData, setFormData] = useState<MessageFormInterface>(initialFormData);
  const [formErrors, setFormErrors] = useState<[] | string>([]);

  function handleChange(evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData, [name]: value
    }));
  }

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    setFormErrors([]);
    try {
      await send(formData);
      setFormData(initialFormData);
    } catch (error) {
      setFormErrors(error[0].message);
    }
  }

  function isFormFilledOut() {
    return Object.values(formData).every(val => val.trim());
  }

  return (
    <div>
      <h3>Send a message</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="recipient">To: </label>
          <input
            id="recipient"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            required />
        </div>
        <div>
          <label htmlFor="body">Message body: </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
            placeholder="Type a message">
          </textarea>
        </div>
        {formErrors.length > 0 && "Error sending message"}
        <button disabled={!isFormFilledOut()}>Send Message</button>
      </form>
    </div>
  );
}

export default MessageForm;
