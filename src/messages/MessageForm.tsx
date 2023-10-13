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
      <form className="border-2 max-w-xl mx-auto p-8 bg-neutral-200 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="recipient">To: </label>
          <input
            id="recipient"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="body">Message body: </label>
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
        {formErrors.length > 0 && "Error sending message"}
        <button className="mx-auto mt-12 block px-5 py-3 rounded-lg
                        bg-green-600 hover:bg-green-500 focus:outline-none
                        focus:ring focus:ring-offset-2 focus:ring-green-400
                        focus:ring-opacity-50 active:bg-green-700
                        text-white shadow-lg uppercase tracking-wider
                        font-semibold text-sm sm:text-base" disabled={!isFormFilledOut()}>Send Message</button>
      </form>
    </div>
  );
}

export default MessageForm;
