import React, {createContext, useEffect, useRef, useState} from 'react';
import './style.scss'
import Header from "../header/Header";
import Footer from "../footer/Footer";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import btnUp from "./images/up.svg"
import {useCookies} from "react-cookie";

const ButtonBackToTop = () => {
    const [scrollY, setScrollY] = useState(0);

    const handleClickBtnBackToTop = () => {
        document.querySelector('body').scrollTop = 0;
    }

    const handleScroll = () => {
        const scrollTop = document.querySelector('body').scrollTop;
        setScrollY(scrollTop);
    };

    useEffect(() => {
        handleScroll();
        document.querySelector('body').addEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            <button
                type="button"
                className={`${scrollY === 0 ? "hideBtn" : "showBtn"}`}
                id="btn-back-to-top"
                style={{display: 'block', right: '25px', left: 'auto'}}
                onClick={handleClickBtnBackToTop}
            >
                <img src={btnUp} alt="icon back to top"/>
            </button>
        </div>

    );
}

export const CartContext = createContext(); // Exporting the context

const AdminMasterLayout = ({children, ...props}) => {
    const [amountInCart, setAmountInCart] = useState(0);
    // const amountInCart = useRef(0);
    const divStyle = {
        marginTop: "80px",
    };
    const [loading, setLoading] = useState(true);

    const [cookies] = useCookies(['access_token']);
    const accessToken = cookies.access_token;

    const apiGetCart = "/api/public/get-cart";

    const getAmountInCart = async () => {
        try {
            const response = await fetch(apiGetCart, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAmountInCart(data.data.cartItems.length);
                console.log(amountInCart.current);
            } else {
                const data = await response.json();
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Không thể kết nối được với database');
        } finally {
            // Bất kể thành công hay không, đặt trạng thái "loading" thành false để hiển thị component.
            // setLoading(false);
        }
    };

    useEffect(() => {
        getAmountInCart().then(r => {});
    }, [])

    // if (loading === true) {
    //     return <div> </div>
    // }

    return (
        <div {...props}>
            <CartContext.Provider value={{amountInCart, getAmountInCart}}>
                <Header/>
                <div style={divStyle}>
                    {children}
                </div>
                <Footer/>
            </CartContext.Provider>

            <ButtonBackToTop/>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{fontSize: "15px"}}
            />
        </div>
    );
}

export default AdminMasterLayout;