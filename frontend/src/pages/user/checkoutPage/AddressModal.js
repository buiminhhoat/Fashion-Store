import React from "react";

function AddressModal({
                          selectedAddress,
                          addressList,
                          updateAddressSelected,
                          openModalUpdateAddress,
                          openModalCreateAddress,
                          closeModalListAddress,
                          confirmAddress,
                      }) {
    return (
        <div className="modal-create-address visible">
            <div className="modal-create-address__backdrop"></div>
            <div className="modal-create-address__content-wrap">
                <div className="modal-create-address__content d-flex flex-column justify-content-between">
                    <div>
                        <div className="modal-title">
                            <img src="/images/icons/location-dot.svg" alt="icon location" />
                            Địa chỉ nhận hàng
                        </div>
                        <div className="list-address">
                            {addressList.map((address) => (
                                <div className="item-address d-flex align-items-center justify-content-between" key={address.id}>
                                    <div className="address-detail d-flex">
                                        <input
                                            type="radio"
                                            name="address"
                                            onChange={() => updateAddressSelected(address.id)}
                                            id={address.id}
                                            value={address.id}
                                            checked={address.id === selectedAddress}
                                        />

                                        <div className="center-content">
                                            <label htmlFor={address.id} onClick={() => updateAddressSelected(address.id)}>
                                                <div className="cart__address__description">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="fw-bold">{address.name} | {address.phone}</div>
                                                    </div>

                                                    <div className="address">{address.address}</div>
                                                </div>
                                            </label>
                                            {address.isDefault && <div className="text_default active">Mặc định</div>}
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
                                <img className="icon_plus_address" src="/images/icons/plus.svg" alt="icon add address" />
                            </div>
                        </div>
                    </div>

                    <div className="modal-create-address-footer">
                        <div className="btn-cancel" onClick={closeModalListAddress}>Hủy bỏ</div>
                        <div className="btn-submit" onClick={confirmAddress}>Xác nhận</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddressModal;
