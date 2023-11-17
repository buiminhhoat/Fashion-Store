import React from "react";
import "./style.scss"

import LoginDialog from "../components/dialogs/LoginDialog/LoginDialog";

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