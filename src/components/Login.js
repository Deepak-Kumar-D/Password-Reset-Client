import { Link, useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().min(6, "⚠ Minimum 6 characters!").required(),
});

function Login() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const obj = await fetch("https://db-password-reset.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const log = await obj.json();

    if (obj.status === 200) {
      alert(log.message);
      reset();
      history.push("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };
  return (
    <div className="container">
      <form method="POST" className="c-align" onSubmit={handleSubmit(onSubmit)}>
        <h4>Login</h4>
        <hr style={{ width: "100%", marginBottom: "0.5rem" }} />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          {...register("email")}
        />
        <p className="message">{errors.email && "⚠ Email-Id is required!"}</p>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          {...register("password")}
        />
        <p className="message">{errors.email && "⚠ Password is required!"}</p>

        <input type="submit" value="SUBMIT" />
      </form>

      <div className="links">
        <Link to="/forgotpassword">Forgot Password?</Link>
        <br />
        <Link to="/register">Create a new account?</Link>
      </div>
    </div>
  );
}

export default Login;
