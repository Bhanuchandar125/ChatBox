import "./Login.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { loginUser } from "../apiCalls/UserCalls";
import { AuthUser, userloginstatus } from "../Components/Context";

const schema = yup
  .object({
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

const Login = () => {
  const { islogin, setIslogin } = useContext(userloginstatus);
  const {loginuser, setLoginuser} = useContext(AuthUser)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (values: any) => {
    const users: any = await loginUser(values);
    setLoginuser(users)
    console.log(users)
    localStorage.setItem("user", users.token);
    alert("login successfully completed");
    setIslogin(true);
    reset();
  };

  useEffect(() => {
    if (islogin) {  
      setTimeout(() => {
        navigate("/");
        
      }, 2000);
    }
  }, [islogin, navigate]);

  return (
    <div>
      <div className="loginbg">
        <div className="loginBox">
          <h3>Login/Sign in</h3>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <small className="validationerror">
              {errors.password?.message}
            </small>
            <br />
            {islogin ? (
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            ) : (
              <input type="submit" className="Login" value={"Login"} />
            )}
          </form>
          <a href="/register" className="anchortag1">
            New User? Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
