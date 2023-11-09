import React, { useState, useEffect } from "react";
import {Cookies, useCookies} from "react-cookie";
import {Link} from "react-router-dom";

const addressesNew = [
    {
        "addressID": 3,
        "usersID": 3,
        "recipientName": "Dzung Tien",
        "recipientPhone": "3123",
        "addressDetails": "Ha Noi",
        "default": false
    },
    {
        "addressID": 4,
        "usersID": 3,
        "recipientName": "Cope",
        "recipientPhone": "",
        "addressDetails": "",
        "default": false
    },
    {
        "addressID": 5,
        "usersID": 3,
        "recipientName": "Kiki",
        "recipientPhone": "0123",
        "addressDetails": "456",
        "default": true
    }
]

function AddressList() {
    const [cookies] = useCookies(['access_token']);
    const accessToken = cookies.access_token;
    const [addresses, setAddresses] = useState([{}, {}]);

    const updateData = () => {
        fetch("http://localhost:9999/api/get-all-addresses", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const sortedAddresses = data.sort((a, b) => (b.isDefault || 0) - (a.isDefault || 0));
                setAddresses(sortedAddresses);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    // console.log(accessToken)
    useEffect(() => {
        // Thực hiện HTTP request để lấy danh sách địa chỉ từ backend
        updateData();
    }, []);

    const handleSetDefault = async (id) => {
        try {
            const formData = new FormData()
            formData.append("addressID", addresses[id].addressID)
            const response = await fetch(`http://localhost:9999/api/set-default-address`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: formData,
            });

            if (response.ok) {
                updateData();
                // Hoặc thực hiện các thao tác cần thiết khác
            } else {
                // Xử lý lỗi nếu có
                console.error("Error:", response);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            {addresses.map((address, index) => (
                <div className="box-address" key={index}>
                    <div className="item-address-wrap" data-item-address-id={index}>
                        <div className="information">
                            <span className="name">{address.recipientName}</span>
                            <div className="break-item">|</div>
                            <span className="phone">{address.recipientPhone}</span>
                            {address.isDefault ?
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
                                <Link to = {"/profile/edit-address/" + address.addressID}>
                                    <div className="edit">Sửa</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AddressList;
