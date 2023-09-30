import {memo} from "react";
import './style.scss';

const Header = () => {
    return (
        <header className="header__top" id="aa-header">
            <div className="aa-header-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="aa-header-bottom-area">
                                <div className="aa-logo">
                                    <a href="/">
                                        <span className="fa fa-shopping-cart"></span>
                                        <p>daily<strong>Shop</strong> <span>Your Shopping Partner</span></p>
                                    </a>
                                </div>
                                <div className="aa-cartbox">
                                    <a className="aa-cart-link" href="#">
                                        <span className="fa fa-shopping-basket"></span>
                                        <span className="aa-cart-title">SHOPPING CART</span>
                                        <span className="aa-cart-notify">2</span>
                                    </a>
                                </div>
                                <div className="aa-search-box">
                                    <form action="">
                                        <input type="text" name="" id="" placeholder="Search here ex. 'man' "/>
                                        <button type="submit">
                                            <span className="fa fa-search"></span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default memo(Header);