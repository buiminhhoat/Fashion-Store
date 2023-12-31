import React, {useEffect, useState} from "react";
import locationDot from "../../cartPage/images/location-dot.svg";
import arrowRight from "../../checkoutPage/images/angle-right.svg";
import {useCookies} from "react-cookie";
import AddressModal from "./AddressModal";
import {toast} from "react-toastify";
import {API, MESSAGE} from "../../../../utils/const"; // Assuming you have an arrow-right image

function AddressSection({ selectedAddress,  setSelectedAddress }) {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const [addresses, setAddresses] = useState([{}]);
  const [openModal, setOpenModal] = useState(false);

  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAddresses = () => {
    const formData = new FormData();
    formData.append('userID', userID);
    console.log("userID = " + userID);
    try {
      fetch(API.PUBLIC.GET_ALL_ADDRESSES_ENDPOINT, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (selectedAddress.addressID === undefined && data.length !== 0) {
              setSelectedAddress(data.find((address) => {return address.isDefault === true}));
            }
            setAddresses(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          })
    }
    finally {
      setLoading(false);
    }
  }

  const fetchUserID = async () => {
    const apiGetUserID = "/api/public/get-user-id";
    try {
      const response = await fetch(apiGetUserID, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserID(data);
      }

    } catch (error) {
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  }

  useEffect(() => {
    fetchUserID().then(r => {});
  }, []);

  useEffect(() => {
    if (userID) getAddresses();
  }, [userID]);

  useEffect(() => {
    if (userID) getAddresses();
  }, [openModal]);

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
          { !addresses.length ?
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
            :
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
          }
        </div>
        { openModal && userID &&
            <AddressModal userID={userID}
                          selectedAddress={selectedAddress}
                          confirmAddress={confirmAddress}
                          closeModalListAddress={closeModalListAddress}
            />
        }
      </>
  );
}

export default AddressSection;
