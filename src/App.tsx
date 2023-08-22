import "./App.css";
import "../src/index.css";
import AppRoutes from "./Routes/AppRoutes";
import { useState } from "react";
import { userloginstatus } from "../src/Components/Context";

function App() {
  const [islogin, setIslogin] = useState<boolean>(false);

  return (
    <>
      <userloginstatus.Provider value={{ islogin, setIslogin }}>
        <AppRoutes />
      </userloginstatus.Provider>
    </>
  );
}

export default App;
