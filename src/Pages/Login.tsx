import './Login.css'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import Config from '../Components/Config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


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
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
 const onSubmit= async(values:any)=>{
  
  try{
    const res = await axios({
        method: "Post",
        url: Config.loginapi ,
        data: values,
      });
      alert ("Login Successfully completed...")
      console.log(values)
      localStorage.setItem("user", values.email)
      navigate("/")
      reset()
      console.log(res)
  }catch(error:any){
    alert(error.response.data)
 }
 }

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
          <small className="validationerror">{errors.password?.message}</small>
          <br />
          <input type="submit" className="Login" value={"Login"}/>
        </form>
        <a href="/register" className="anchortag1">
          New User? Register
        </a>
      </div>
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Form submitted successfully!"
      /> */}
    </div>
    </div>
  )
}

export default Login