import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SignupFormInterface } from "../interfaces";
import Alert from "../common/Alert";
import { getErrorMsg } from "../utils";
import { Spinner } from "../common/Spinner";
import Button from "../common/Button";


interface SignupFormProps {
  signup: (data: SignupFormInterface) => Promise<void>;
}


function SignupForm({ signup }: SignupFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormInterface>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });
  const [formErrors, setFormErrors] = useState<string[][] | string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;

    setFormData(fData => ({
      ...fData, [name]: value
    }));
  }

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setIsLoading(true);
    setFormErrors([]);
    try {
      await signup(formData);
      navigate("/");
    } catch (errors) {
      setIsLoading(false);
      const messages = getErrorMsg(errors);
      setFormErrors(messages);
    }
  }

  return (
    <div>
      <form className="border-2 max-w-xl mx-auto my-20 p-8 bg-neutral-200 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="mt-2 mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-800">
          Sign up for ShareBnB
        </h2>
        <div className="mb-4">
          <label className="block text-sm text-neutral-900 font-medium leading-6" htmlFor="username">
            Username
          </label>
          <div className="mt-2">
            <input
              id="username"
              name="username"
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
              value={formData.password}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-neutral-900 font-medium leading-6" htmlFor="firstName">
            First name
          </label>
          <div className="mt-2">
            <input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-neutral-900 font-medium leading-6" htmlFor="lastName">
            Last name
          </label>
          <div className="mt-2">
            <input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-neutral-900 font-medium leading-6" htmlFor="email">
            Email
          </label>
          <div className="mt-2">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button color="green">Sign up</Button>
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
    </div>
  );
}

export default SignupForm;
