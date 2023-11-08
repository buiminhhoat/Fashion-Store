import React, { useState, useEffect } from "react";
import {Cookies, useCookies} from "react-cookie";

const addressesNew = [
    {
        "addressID": 3,
        "usersID": 3,
        "recipientName": "Nguyễn Tiến Dũng",
        "recipientPhone": "0903481758",
        "addressDetails": "Trương Định, Tương Mai, Hoàng Mai, Hà Nội"
    },
    {
        "addressID": 4,
        "usersID": 3,
        "recipientName": "Nguyễn Tiến Dũng",
        "recipientPhone": "0903481758",
        "addressDetails": "Silicon Valley, United States of America"
    },
    {
        "addressID": 5,
        "usersID": 3,
        "recipientName": "Nguyễn Tiến Dũng",
        "recipientPhone": "0903481758",
        "addressDetails": "Massachusetts Institute of Technology, United States of America"
    }
]

function AddressList() {
    const [cookies] = useCookies(['access_token']);
    const accessToken = cookies.access_token;
    const [addresses, setAddresses] = useState([{}, {}]);
    // console.log(accessToken)
    useEffect(() => {
        // Thực hiện HTTP request để lấy danh sách địa chỉ từ backend
        fetch("http://localhost:9999/api/get-all-addresses", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setAddresses(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const handleSetDefault = (id) => {
        return 1;
    }

    return (
        <div>
            {addresses.map((address, index) => (
                <div className="box-address" key={index}>
                    <div className="item-address-wrap" data-item-address-id={index}>
                        <div className="information">
                            <span className="name">{address.recipientName}</span>
                            <div className="break-item">|</div>
                            <span className="phone">{address.recipientPhone}</span>
                            {address.default ?
                                (<div className="default-address">Mặc định</div>) :
                                (<button className="btn-set-default pointer" data-address-id="652c63418a828b4b6e095526" onClick={() => handleSetDefault(index)}>
                                    <span className="set-default">
                                        Thiết lập mặc định
                                    </span>
                                 </button>)
                            }
                        </div>
                        <div className="address">
                            <span>{address.addressDetails}</span>
                        </div>
                        <div className="box-btn-wrap">
                            <div className="btn-wrap-item">
                                <a href={address.editLink} className="edit">Sửa</a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AddressList;
