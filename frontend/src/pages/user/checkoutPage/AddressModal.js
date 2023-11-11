import React, {useEffect, useState} from "react";
import locationDot from "./images/location-dot.svg"
import plus from '../profilePage/images/plus.svg'
import "./style.scss"
import {useCookies} from "react-cookie";
function AddressModal({
                          selectedAddress,
                          // addressList,
                          // updateAddressSelected,
                          // setSelectedAddress,
                          openModalUpdateAddress,
                          openModalCreateAddress,
                          closeModalListAddress,
                          confirmAddress,
                      }) {
    const [cookies] = useCookies(['access_token']);
    const accessToken = cookies.access_token;
    const [addressList, setAddressList] = useState([{}])
    const [idSelected, setIdSelected] = useState(selectedAddress.addressID)
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
                setAddressList(sortedAddresses);
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

    const handleSetAddressDefault = async (id) => {
        try {
            const formData = new FormData()
            formData.append("addressID", addressList[id].addressID)
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

    const updateAddressSelected = (addressID) => {
        setIdSelected(addressID);
    }

    return (
        <div className="modal-create-address visible">
            <div className="modal-create-address__backdrop"></div>
            <div className="modal-create-address__content-wrap">
                <div className="modal-create-address__content d-flex flex-column justify-content-between">
                    <div>
                        <div className="modal-title">
                            <img src={locationDot} alt="icon location" />
                            Địa chỉ nhận hàng
                        </div>
                        <div className="list-address">
                            {addressList.map((address, index) => (
                                <div className="item-address d-flex align-items-center justify-content-between" key={address.addressID}>
                                    <div className="address-detail d-flex">
                                        <input
                                            type="radio"
                                            name="address"
                                            onChange={() => updateAddressSelected(address.addressID)}
                                            id={address.addressID}
                                            value={address.addressID}
                                            checked={address.addressID === idSelected}
                                        />

                                        <div className="center-content">
                                            <label onClick={() => updateAddressSelected(address.addressID)}>
                                                <div className="cart__address__description">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="fw-bold">{address.recipientName} | {address.recipientPhone}</div>
                                                    </div>

                                                    <div className="address">{address.addressDetails}</div>
                                                </div>
                                            </label>
                                            {address.isDefault ? (
                                                    <div className="text_default active">Mặc định</div>
                                                ):(
                                                    <div className="text_default" onClick={() => handleSetAddressDefault(index)}>
                                                        Thiết lập mặc định
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className="action-address">
                                        <span className="text-edit" onClick={() => openModalUpdateAddress(address.id)}>Sửa</span>
                                    </div>
                                </div>
                            ))}

                            <div className="item-address d-flex justify-content-between align-items-center cursor-point" onClick={openModalCreateAddress}>
                                <div className="cart__address__description pdr-76px pdl-25_17">
                                    <div className="fw-bold mb-6px">Thêm địa chỉ mới</div>
                                </div>
                                <img className="icon_plus_address" src={plus} alt="icon add address" />
                            </div>
                        </div>
                    </div>

                    <div className="modal-create-address-footer">
                        <div className="btn-cancel" onClick={closeModalListAddress}>Hủy bỏ</div>
                        <div className="btn-submit" onClick={() => confirmAddress(addressList.find((address) => address.addressID === idSelected))}>Xác nhận</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddressModal;
