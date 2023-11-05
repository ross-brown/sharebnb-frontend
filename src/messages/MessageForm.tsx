import { useState } from "react";
import { MessageFormInterface } from "../interfaces";
import Alert from "../common/Alert";
import { getErrorMsg } from "../utils";

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
    } catch (errors) {
      const messages = getErrorMsg(errors)
      setFormErrors(messages);
    }
  }

  function isFormFilledOut() {
    return Object.values(formData).every(val => val.trim());
  }

  return (
    <div>
      <form className="border-2 max-w-xl mx-auto p-8 bg-neutral-200 rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <h3 className="text-xl mb-4 font-bold text-neutral-800 text-center">Send a message</h3>
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
        {formErrors.length > 0 && <Alert errors={formErrors}/>}
        <button className="mx-auto mt-12 block px-5 py-3 rounded-lg
                        bg-green-600 hover:bg-green-500 focus:outline-none
                        focus:ring focus:ring-offset-2 focus:ring-green-400
                        focus:ring-opacity-50 active:bg-green-700
                        text-white shadow-lg uppercase tracking-wider
                        font-semibold text-sm sm:text-base" disabled={!isFormFilledOut()}>

                          <div className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 inline">
                        <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                      </svg>
                      <span className="ps-3">Send Message</span></div></button>
      </form>
    </div>
  );
}

export default MessageForm;
