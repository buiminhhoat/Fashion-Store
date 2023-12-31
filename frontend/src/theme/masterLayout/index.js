import React, {createContext, useEffect, useRef, useState} from 'react';
import './style.scss'
import Header from "../header/Header";
import Footer from "../footer/Footer";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {useCookies} from "react-cookie";
import BackToTopButton from "../../components/buttons/BackToTopButton/BackToTopButton";
import {MESSAGE} from "../../utils/const";

export const CartContext = createContext(); // Exporting the context

const MasterLayout = ({children, ...props}) => {
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
                // console.log(amountInCart.current);
            } else {
                const data = await response.json();
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(MESSAGE.DB_CONNECTION_ERROR);
        } finally {
            // Bất kể thành công hay không, đặt trạng thái "loading" thành false để hiển thị component.
            // setLoading(false);
        }
    };

    useEffect(() => {
        getAmountInCart();
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

            <BackToTopButton/>
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

export default MasterLayout;