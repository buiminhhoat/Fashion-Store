import {memo} from "react";
import "./style.scss"

import LoginDialog from "../dialog/LoginDialog/LoginDialog";

const LoginPage = () => {
  return (
      <div>
        <LoginDialog />
      </div>
  );
}

export default memo(LoginPage);