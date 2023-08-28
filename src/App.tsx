import "./App.css";
import "../src/index.css";
import AppRoutes from "./Routes/AppRoutes";
import { useState } from "react";
import { userloginstatus } from "../src/Components/Context";
import {selectedFilesArray, sentMessagesArray} from './Components/Context';

import './index.css';

function App() {
  const [islogin, setIslogin] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [sentmessages, setSentMessages] = useState([]);

  

  return (
    <>
    
    <selectedFilesArray.Provider value ={{selectedFiles, setSelectedFiles}}>
      <userloginstatus.Provider value={{ islogin, setIslogin }}>
        <sentMessagesArray.Provider value ={{sentmessages, setSentMessages}}>

        <AppRoutes />
        
        </sentMessagesArray.Provider>
      </userloginstatus.Provider>
      </selectedFilesArray.Provider>
    </>
  );
}

export default App;
