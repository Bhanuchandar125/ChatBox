import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Register.css";
import Config from "../Components/Config";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../apiCalls/UserCalls";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().required("*Required").email("Must be valid mail"),
    password: yup
      .string()
      .required("Password is required")

      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one numeric digit")
      .matches(
        /[!@#$%^&*]/,
        "Password must contain at least one special character (!@#$%^&*)"
      )
      .min(8, "Password must be at least 8 characters long"),
  })
  .required();

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (values: any) => {
    const response = await postRequest(`${Config.registerapi}`, values);

    if (response.error) {
      console.log("registration error", response);
      alert("Server error...")
    } else {
      alert("Registration completed Successfully...");
      navigate("/login");
    }
    reset();
  };

  return (
    <div className="Registerbg">
      <div className="RegisterBox">
        <h3>Register/Sign up</h3>
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name:</label>
          <br />
          <input type="text" {...register("name")} className="inputel" />
          <br />
          <small className="validationerror">{errors.name?.message}</small>
          <br />
          <label>Email Adress:</label>
          <br />
          <input type="text" {...register("email")} className="inputel" />
          <br />
          <small className="validationerror">{errors.email?.message}</small>
          <br />
          <label>Password:</label>
          <br />
          <input
            type="password"
            {...register("password")}
            className="inputel"
          />
          <br />
          <small className="validationerror">{errors.password?.message}</small>
          <br />
          <input type="submit" className="submit" />
        </form>
        <a href="/login" className="anchortag1">
          already registered? Login
        </a>
      </div>
    </div>
  );
};

export default Register;
