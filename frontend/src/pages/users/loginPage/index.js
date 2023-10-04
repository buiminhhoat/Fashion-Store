import {memo} from "react";

const LoginPage = () => {
    const divStyle = {
        padding: "200px",
    };

    return (
        <div style={divStyle}>Login Page</div>
    );
}

export default memo(LoginPage);