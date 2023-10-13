import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SignupFormInterface } from "../interfaces";
import Alert from "../common/Alert";


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
  const [formErrors, setFormErrors] = useState<[] | string>([]);

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;

    setFormData(fData => ({
      ...fData, [name]: value
    }));
  }

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    try {
      await signup(formData);
      navigate("/");
    } catch (errors) {
      setFormErrors(errors[0].message);
    }
  }

  return (
    <div>

      <form className="border-2 max-w-xl mx-auto mt-20 p-8 bg-neutral-200 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h3 className="text-xl mb-4 font-bold text-neutral-800 text-center">Sign up for ShareBnB</h3>
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
        <div className="mb-4">
          <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral 700 leading-tight focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-neutral-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
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
        <div className="mb-4">
          <button className="mx-auto mt-12 block px-5 py-3 rounded-lg
                        bg-green-600 hover:bg-green-500 focus:outline-none
                        focus:ring focus:ring-offset-2 focus:ring-green-400
                        focus:ring-opacity-50 active:bg-green-700
                        text-white shadow-lg uppercase tracking-wider
                        font-semibold text-sm sm:text-base">Log In</button>
        </div>
      </form>
      {formErrors.length > 0 && <Alert errors={formErrors} />}
    </div>
  );
}

export default SignupForm;
