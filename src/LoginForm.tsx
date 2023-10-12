import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginFormInterface } from "./interfaces";

interface LoginFormProps {
  login: (data: LoginFormInterface) => void
}

function LoginForm({ login }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormInterface>(
    { username: "", password: "" });
  const [formErrors, setFormErrors] = useState<[] | string>([]);
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
    } catch (error) {
      setFormErrors(error);
    }
  }

  return (
    <div>
      <h3>Login to ShareBnB</h3>

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
        {formErrors.length > 0 ? "ERROR": ""}
        <div>
          <button>Log In</button>
        </div>
      </form>
    </div>
  );
}


export default LoginForm;
