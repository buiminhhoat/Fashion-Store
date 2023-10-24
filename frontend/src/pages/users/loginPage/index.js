import React from "react";
import "./style.scss"

import LoginDialog from "../dialog/LoginDialog/LoginDialog";

const LoginPage = () => {
  const handleDialogSwitch = (dialogName) => {
  };

  const handleDialogClose = () => {
  };

  return (
      <div>
        <LoginDialog onClose={handleDialogClose} onSwitch={handleDialogSwitch} />
      </div>
  );
}

export default LoginPage;