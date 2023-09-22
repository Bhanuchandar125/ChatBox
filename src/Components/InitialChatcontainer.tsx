import React, { useContext } from "react";
import { Authuser } from "./Context";

function InitialChatcontainer() {
  const {loginuser} = useContext(Authuser)
  
  return (
    <div className="chatHeading">
      <h1>welcome, {loginuser.name}!</h1>
      <p>Ready? Set. Chat! Let's jump right into things.</p>
      <div className="d-flex chatImages">
        <div>
          <img
            src="https://ssl.gstatic.com/dynamite/images/cr/onboardingzerostate/chat_onboarding.svg"
            alt="Chat_Image"
          />
          <p>
            Send a message to a <br />
            colleague or friend
          </p>
        </div>
        <div>
          <img
            src="https://ssl.gstatic.com/dynamite/images/cr/onboardingzerostate/space_onboarding.svg"
            alt="Spaces_Image"
          />
          <p>
            Collaborate on
            <br />
            projects with teams or groups
          </p>
        </div>
        <div>
          <img
            src="https://ssl.gstatic.com/dynamite/images/cr/onboardingzerostate/apps_onboarding.svg"
            alt="Apps_Image"
          />
          <p>
            Find tools to upgrade
            <br />
            your workflows
          </p>
        </div>
      </div>
    </div>
  );
}

export default InitialChatcontainer;
