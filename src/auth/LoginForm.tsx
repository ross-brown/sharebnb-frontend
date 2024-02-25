import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <form
      className="border-0 max-w-xl mx-auto mt-20 p-8 bg-neutral-200 rounded-lg space-y-6"
      onSubmit={handleSubmit}
    >
      <h2 className="mt-10 mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-800">
        Log in to your account
      </h2>
      <div className="mb-4">
        <label className="block text-sm text-neutral-900 font-medium leading-6" htmlFor="username">
          Username
        </label>
        <div className="mt-2">
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
      </div>
      <div className="mb-4">
        <label className="block text-sm text-neutral-900 font-medium leading-6" htmlFor="password">
          Password
        </label>
        <div className="mt-2">
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
      </div>
      <div className="flex justify-center">
        <Button color="green" disabled={isLoading}>Log in</Button>
      </div>
      <p className="text-center text-sm text-gray-700">
        New here?{" "}
        <Link
          to="/signup"
          className="font-semibold leading-6 text-green-600 hover:text-green-700"
        >
          Create an account
        </Link>
      </p>
      <div className="italic text-gray-600 flex flex-col">
        <p className="underline font-semibold">Guest Credentials:</p>
        <p>Username: <span className="font-semibold">testuser</span></p>
        <p>Password: <span className="font-semibold">password</span></p>
      </div>
      {isLoading &&
        <div className="flex justify-center m-6 font-semibold text-xl">
          <div role="status">
            <Spinner size="lg" />
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
      {formErrors.length > 0 && <Alert messages={formErrors} />}
    </form>
  );
}


export default LoginForm;
