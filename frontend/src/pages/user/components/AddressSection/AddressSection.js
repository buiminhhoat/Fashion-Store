import React, {useEffect, useState} from "react";
import locationDot from "../../cartPage/images/location-dot.svg";
import arrowRight from "../../checkoutPage/images/angle-right.svg";
import {toast} from "react-toastify";
import {useCookies} from "react-cookie";
import AddressModal from "../../checkoutPage/AddressModal"; // Assuming you have an arrow-right image

function AddressSection({
                            // openModalListAddress,
                            // addresses,
                            // selectedAddress,
                        }) {

    const [addresses, setAddresses] = useState([{}]);
    const [openModal, setOpenModal] = useState(false);


    const [cookies] = useCookies(['access_token']);
    const [selectedAddress, setSelectedAddress] = useState({})
    const accessToken = cookies.access_token;
    const [loading, setLoading] = useState(true); // Thêm biến state để kiểm soát trạng thái fetching.

    const getAddresses = () => {
        const formData = new FormData();
        // formData.append('addressID', addressID);
        try {
            fetch("http://localhost:9999/api/get-all-addresses", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
                // body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setSelectedAddress(data.find((address) => {return address.isDefault == true}));
                    setAddresses(data);
                    // console.log(isDefault)
                })
                .catch((error) => {
                    console.error("Error:", error);
                })
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAddresses();

    }, []);

    if (loading) {
        // Trong quá trình fetching, hiển thị một thông báo loading hoặc spinner.
        return <div></div>;

    }

    const openModalListAddress = () => {
        setOpenModal(true);
    }

    const closeModalListAddress = () => {
        setOpenModal(false);
    }

    const confirmAddress = (address) => {
        setSelectedAddress(address);
        setOpenModal(false);
    }

    return (
        <>
            <div className="cart__address cursor-pointer" onClick={openModalListAddress}>
                {!addresses.length ? (
                    <>
                        <div className="cart__address__title d-flex align-items-center justify-content-between">
                            <div className="cart__address__title__left mb-6px">
                                <img src={locationDot} alt="icon address" />
                                <h5 className="mb-0">Địa chỉ nhận hàng</h5>
                            </div>
                        </div>
                        <div className="cart__address__description">
                            <div>Tạo địa chỉ nhận hàng tại đây</div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="cart__address__title d-flex align-items-center justify-content-between">
                            <div className="cart__address__title__left mb-6px">
                                <img src={locationDot} alt="icon address" />
                                <h5 className="mb-0">Địa chỉ nhận hàng</h5>
                            </div>
                            <div className="d-flex align-items-center" onClick={openModalListAddress}>
                                <span className="change-address">Thay đổi địa chỉ</span>
                                <img src={arrowRight} alt="icon arrow next" />
                            </div>
                        </div>
                        <div className="cart__address__description">
                            <div>
                                {selectedAddress.recipientName}
                                <span>|</span> {selectedAddress.recipientPhone}
                            </div>
                            <div> {selectedAddress.addressDetails}</div>
                        </div>
                    </>
                )}
            </div>
            {openModal && (
                    <AddressModal selectedAddress={selectedAddress} confirmAddress = {confirmAddress} closeModalListAddress={closeModalListAddress}/>
                )
            }
        </>
    );
}

export default AddressSection;
