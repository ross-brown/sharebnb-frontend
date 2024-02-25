import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginFormInterface } from "../interfaces";
import Alert from "../common/Alert";
import { getErrorMsg } from "../utils";
import { Spinner } from "../common/Spinner";
import Button from "../common/Button";

interface LoginFormProps {
  login: (data: LoginFormInterface) => Promise<void>;
}

function LoginForm({ login }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormInterface>({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState<string[][] | string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData, [name]: value
    }));
  }

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    setIsLoading(true);
    setFormErrors([]);

    try {
      await login(formData);
      navigate("/");
    } catch (errors) {
      setIsLoading(false);
      const messages = getErrorMsg(errors);
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
          autoComplete="username"
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
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
        />
      </div>
      <div className="flex justify-center">
        <Button color="green" disabled={isLoading}>Log in</Button>
      </div>
      <div className="italic text-gray-600 flex flex-col">
        <p className="underline font-semibold">Guest Credentials:</p>
        <p>Username: <span className="font-semibold">testuser</span></p>
        <p>Password: <span className="font-semibold">password</span></p>
      </div>
      {isLoading &&
        <div className="flex justify-center m-6 font-semibold text-xl">
          <div role="status">
            <Spinner size="lg"/>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
      {formErrors.length > 0 && <Alert messages={formErrors} />}
    </form>
  );
}


export default LoginForm;
