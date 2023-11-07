import React from 'react';
import './style.scss';
import iconOrder from '../images/order.svg';
import likeProduct from '../images/likeProduct.svg'
import view from '../images/view.svg'
import edit from '../images/edit.svg'
import address from '../images/address.svg'
import unlocked from '../images/unlocked.svg'
import logout from '../images/logout.svg'
import emptyProduct from '../images/empty-product.png'
import plus from '../images/plus.svg'

import addressList from './addressList'
import Menu from "../utils/menu.js"

const ProfileAddress = () => {
    return (
        <div id="app">
            <main id="main">
                <div className="container profile-wrap">
                    <div className="breadcrumb-wrap">
                        <a href="/">Trang chủ</a> &gt; <span>Tài khoản của tôi</span>
                    </div>

                    <div className="row content-wrap">
                        <Menu/>

                        <div className="col-8 content-children item-row">
                            <div className="address-wrap">
                                <div className="header-wrap">
                                    <span className="title">Sổ địa chỉ</span>
                                </div>
                                {addressList()}
                                <a href="https://5sfashion.vn/profile/new-address" className="btn-wrap">
                                    <span>Thêm địa chỉ mới</span>
                                    <img src={plus} alt="icon add address" />
                                </a>

                                <div className="modal fade" id="delete-address-modal" data-bs-keyboard="false">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header subs-header">
                                                <span className="modal-title">Cảnh báo</span>
                                            </div>
                                            <div className="modal-sub-title">
                                                Bạn có chắc chắn muốn xóa địa chỉ này?
                                            </div>
                                            <div className="modal-delete-address-footer">
                                                <div className="btn-cancel" id="btn-close-modal" data-bs-dismiss="modal">
                                                    Hủy bỏ
                                                </div>
                                                <div className="btn-submit" id="btn-delete">
                                                    Xóa
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default ProfileAddress;