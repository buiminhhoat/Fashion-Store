import React, { useState, useEffect } from "react";
import {Cookies, useCookies} from "react-cookie";

let addresses = [
    {
        id: "65201956a33b82cac209f638",
        recipientName: "Bùi Minh Hoạt",
        recipientPhone: "0945405xxx",
        isDefault: true,
        addressDetails: "144 XT, Phường DVH, Quận CG, Hà Nội",
        editLink: "https://5sfashion.vn/profile/address/65201956a33b82cac209f638",
    },

    {
        id: "65201956a33b82cac209a529",
        recipientName: "Nguyễn Châu Khanh",
        recipientPhone: "0944252xxx",
        isDefault: false,
        addressDetails: "3 VTQ, Phường XYZ, Quận Thanh Xuân, Hà Nội",
        editLink: "https://5sfashion.vn/profile/address/65201956a33b82cac209a529",
    },

    {
        id: "65201956a33b82cac209sf32",
        recipientName: "Nguyễn Tiến Dũng",
        recipientPhone: "0903481xxx",
        isDefault: false,
        addressDetails: "Trương Định, Phường MNP, Quận Hoàng Mai, Hà Nội",
        editLink: "https://5sfashion.vn/profile/address/65201956a33b82cac209sf32",
    },
    // Thêm các địa chỉ khác vào đây nếu cần
];

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
    const [addresses, setAddresses] = useState([]);

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
                setAddresses(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    return (
        <div>
            {addresses.map((address, index) => (
                <div className="box-address" key={index}>
                    <div className="item-address-wrap" data-item-address-id={index}>
                        <div className="information">
                            <span className="name">{address.recipientName}</span>
                            <div className="break-item">|</div>
                            <span className="phone">{address.recipientPhone}</span>
                            {address.isDefault && <div className="default-address">Mặc định</div>}
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
