import {memo} from "react";

const HomePage = () => {
    const divStyle = {
        padding: "200px",
    };

    return (
        <div style={divStyle}>hompage</div>
    );
}

export default memo(HomePage);