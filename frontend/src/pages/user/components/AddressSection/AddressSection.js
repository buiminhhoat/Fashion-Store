import React from "react";
import locationDot from "../../cartPage/images/location-dot.svg";
import arrowRight from "../../checkoutPage/images/angle-right.svg"; // Assuming you have an arrow-right image

function AddressSection({
                            openModalListAddress,
                            addresses,
                            selectedAddress,
                        }) {
    return (
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
    );
}

export default AddressSection;
