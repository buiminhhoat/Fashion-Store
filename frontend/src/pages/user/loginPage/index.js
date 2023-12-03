import React from "react";
import "./style.scss"

import LoginDialog from "../../../components/dialogs/LoginDialog/LoginDialog";
import {ScrollToTop} from "../../../utils";

const LoginPage = () => {
  const handleDialogSwitch = (dialogName) => {
  };

  const handleDialogClose = () => {
  };

  return (
      <div>
        <ScrollToTop />
        <LoginDialog onClose={handleDialogClose} onSwitch={handleDialogSwitch} />
      </div>
  );
}

export default LoginPage;