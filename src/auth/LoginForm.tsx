import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginFormInterface } from "../interfaces";
import Alert from "../common/Alert";
import { getErrorMsg } from "../utils";

interface LoginFormProps {
  login: (data: LoginFormInterface) => Promise<void>;
}

function LoginForm({ login }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormInterface>(
    { username: "", password: "" });
  const [formErrors, setFormErrors] = useState<string[][] | string[]>([]);
  const navigate = useNavigate();


  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData, [name]: value
    }));
  }

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    try {
      await login(formData);
      navigate("/");
    } catch (errors) {
      const messages = getErrorMsg(errors)
      setFormErrors(messages);
    }
  }

  return (
    <form className="border-2 max-w-xl mx-auto mt-20 p-8 bg-neutral-200 rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <h3 className="text-xl mb-4 font-bold text-neutral-800 text-center">Login to ShareBnB</h3>
      <div className="mb-4">
        <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
        />
      </div>
      <div>
        <button className="mx-auto mt-12 block px-5 py-3 rounded-lg
                        bg-green-600 hover:bg-green-500 focus:outline-none
                        focus:ring focus:ring-offset-2 focus:ring-green-400
                        focus:ring-opacity-50 active:bg-green-700
                        text-white shadow-lg uppercase tracking-wider
                        font-semibold text-sm sm:text-base">Log In</button>
      </div>
      {formErrors.length > 0 && <Alert errors={formErrors} />}
    </form>
  );
}


export default LoginForm;
