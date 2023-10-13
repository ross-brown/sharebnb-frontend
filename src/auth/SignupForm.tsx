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
      <h3>Sign up for ShareBnB</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button>Log In</button>
        </div>
      </form>
      {formErrors.length > 0 && <Alert errors={formErrors} />}
    </div>
  );
}

export default SignupForm;
