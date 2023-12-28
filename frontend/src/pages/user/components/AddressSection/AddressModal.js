import React, {useEffect, useRef, useState} from "react";
import locationDot from "../../checkoutPage/images/location-dot.svg"
import plus from '../../profilePage/images/plus.svg'
import "../../checkoutPage/style.scss"
import {useCookies} from "react-cookie";
import {toast} from "react-toastify";

const MODAL = {
  LIST_ADDRESS: 'LIST_ADDRESS',
  CREATE_ADDRESS: 'CREATE_ADDRESS',
  UPDATE_ADDRESS: 'UPDATE_ADDRESS'
}

function AddressModal({ userID, selectedAddress, closeModalListAddress, confirmAddress }) {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const updateAddressID = useRef(0);

  const [openModal, setOpenModal] = useState(MODAL.LIST_ADDRESS)

  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [addressList, setAddressList] = useState([{}]);
  const [idSelected, setIdSelected] = useState(selectedAddress.addressID);

  const updateData = () => {
    const formData = new FormData();
    formData.append('userID', userID);

    fetch("/api/public/get-all-addresses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
      body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const sortedAddresses = data.sort((a, b) => (b.isDefault || 0) - (a.isDefault || 0));
          setAddressList(sortedAddresses);
          setIsDefault(data.length === 0);
          if (data.length === 1) setIdSelected(data[0].addressID);

        })
        .catch((error) => {
          console.error("Error:", error);
        });
  }

  useEffect(() => {
    updateData();
  }, [openModal]);

  const handleSetAddressDefault = async (id) => {
    try {
      const formData = new FormData()
      formData.append("addressID", addressList[id].addressID)
      const response = await fetch(`/api/public/set-default-address`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        updateData();
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateAddressSelected = (addressID) => {
    setIdSelected(addressID);
  }

  const handleConfirmCreateAddress = async () => {

    const formData = new FormData();

    console.log(recipientName);
    formData.append('recipientName', recipientName);
    formData.append('recipientPhone', recipientPhone);
    formData.append('addressDetails', addressDetails);
    formData.append('isDefault', isDefault);

    console.log(formData);

    try {
      const response = await fetch("/api/public/new-address", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      })

      if (response.status === 200) {
        let jsonResponse = await response.json();
        // alert(jsonResponse.message);
      }
      else {
        let jsonResponse = await response.json();
        // alert(jsonResponse.message);
      }
    } catch (error) {
      toast.error("Không thể kết nối được với database");
    }

    switchModal(MODAL.LIST_ADDRESS)
  }

  const handleConfirmUpdateAddress = async (addressID) => {
    const formData = new FormData();

    console.log(addressID);
    formData.append('addressID', addressID);
    formData.append('recipientName', recipientName);
    formData.append('recipientPhone', recipientPhone);
    formData.append('addressDetails', addressDetails);
    formData.append('isDefault', addressList.find((address) => address.addressID === addressID).isDefault);

    console.log(formData);

    try {
      const response = await fetch("/api/public/edit-address", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      })

      if (response.status === 200) {
        let jsonResponse = await response.json();
        // alert(jsonResponse.message);
      }
      else {
        let jsonResponse = await response.json();
        // alert(jsonResponse.message);
      }
    } catch (error) {
      toast.error("Không thể kết nối được với database");
    }
    switchModal(MODAL.LIST_ADDRESS)
  }

  const switchModal = (modal, updateID) => {
    setOpenModal(modal);
    updateAddressID.current = updateID;

    if (updateID !== undefined) {
      const formData = new FormData();
      formData.append('addressID', updateID);
      try {
        fetch("/api/public/get-address", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
          body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setRecipientName(data.recipientName);
              setRecipientPhone(data.recipientPhone);
              setAddressDetails(data.addressDetails);
            })
            .catch((error) => {
              console.error("Error:", error);
            })
      }
      finally {
        // setLoading(false);
      }
    }
  }


  return (
      <>
        {openModal === MODAL.LIST_ADDRESS && (
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
                          <div className="item-address d-flex align-items-center justify-content-between" key={index}>
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
                              <span className="text-edit" onClick={() => switchModal(MODAL.UPDATE_ADDRESS, address.addressID)}>Sửa</span>
                            </div>
                          </div>
                      ))}

                      <div className="item-address d-flex justify-content-between align-items-center cursor-point" onClick={() => switchModal(MODAL.CREATE_ADDRESS)}>
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
        )
        }

        {openModal === MODAL.CREATE_ADDRESS && (
            <div className="modal-create-address visible">
              <div className="modal-create-address__backdrop"></div>
              <div className="modal-create-address__content-wrap">
                <div className="modal-create-address__content flex-column d-flex justify-content-between">
                  <div>
                    <div className="modal-title">
                      <img src={locationDot} alt="icon address"/>
                      Địa chỉ nhận hàng
                    </div>
                    <div className="modal-sub-title">
                      Thêm địa chỉ
                    </div>
                    <div className="input-item">
                      <div className="input-item__title">
                        Họ tên
                      </div>
                      <div className="input-item__value">
                        <input className="name" type="text"
                               placeholder="Nhập họ tên"
                               onChange={(e) => setRecipientName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <hr />
                      <div className="input-item">
                        <div className="input-item__title">
                          Số điện thoại
                        </div>
                        <div className="input-item__value">
                          <input className="phone" type="text"
                                 placeholder="Nhập số điện thoại"
                                 onChange={(e) => setRecipientPhone(e.target.value)}
                          />
                        </div>
                      </div>

                      <hr />

                      <div className="input-item">
                        <div className="input-item__title">
                          Địa chỉ
                        </div>
                        <div className="input-item__value">
                          <input className="address" type="text"
                                 placeholder="Nhập địa chỉ"
                                 onChange={(e) => setAddressDetails(e.target.value)}/>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="modal-create-address-footer ">
                    {/*<div onClick={updateAddress} className="btn-submit">Cập nhật</div>*/}
                    <div className="btn-cancel" onClick={() => switchModal(MODAL.LIST_ADDRESS)}>Hủy bỏ</div>
                    <div className="btn-submit" onClick={handleConfirmCreateAddress}>Xác nhận</div>
                  </div>
                </div>
              </div>
            </div>
        )
        }

        {openModal === MODAL.UPDATE_ADDRESS && (
            <div className="modal-create-address visible">
              <div className="modal-create-address__backdrop"></div>
              <div className="modal-create-address__content-wrap">
                <div className="modal-create-address__content flex-column d-flex justify-content-between">
                  <div>
                    <div className="modal-title">
                      <img src={locationDot} alt="icon address"/>
                      Địa chỉ nhận hàng
                    </div>
                    <div className="modal-sub-title">
                      Thêm địa chỉ
                    </div>
                    <div className="input-item">
                      <div className="input-item__title">
                        Họ tên
                      </div>
                      <div className="input-item__value">
                        <input className="name" type="text"
                               placeholder="Nhập họ tên"
                               onChange={(e) => setRecipientName(e.target.value)}
                               defaultValue={addressList.find((address) => address.addressID === updateAddressID.current).recipientName}
                        />
                      </div>
                    </div>
                    <div>
                      <hr />
                      <div className="input-item">
                        <div className="input-item__title">
                          Số điện thoại
                        </div>
                        <div className="input-item__value">
                          <input className="phone" type="text"
                                 placeholder="Nhập số điện thoại"
                                 onChange={(e) => setRecipientPhone(e.target.value)}
                                 defaultValue={addressList.find((address) => address.addressID === updateAddressID.current).recipientPhone}
                          />
                        </div>
                      </div>

                      <hr />

                      <div className="input-item">
                        <div className="input-item__title">
                          Địa chỉ
                        </div>
                        <div className="input-item__value">
                          <input className="address" type="text"
                                 placeholder="Nhập địa chỉ"
                                 onChange={(e) => setAddressDetails(e.target.value)}
                                 defaultValue={addressList.find((address) => address.addressID === updateAddressID.current).addressDetails}
                          />
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="modal-create-address-footer ">
                    <div className="btn-cancel" onClick={() => switchModal(MODAL.LIST_ADDRESS)}>Hủy bỏ</div>
                    <div className="btn-submit" onClick={() => handleConfirmUpdateAddress(updateAddressID.current)}>Cập nhật</div>
                  </div>
                </div>
              </div>
            </div>
        )
        }

      </>
  );
}

export default AddressModal;
