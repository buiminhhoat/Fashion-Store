import React from 'react';
import { Link } from "react-router-dom";

import './style.scss';

import plus from '../images/plus.svg'

import AddressList from './AddressList'

const ProfileAddress = () => {
  return (
      <div className="col-8 content-children item-row">
        <div className="address-wrap">
          <div className="header-wrap">
            <span className="title">Sổ địa chỉ</span>
          </div>
          <AddressList/>
          <Link to= {"/profile/new-address"} className="btn-wrap">
            <span>Thêm địa chỉ mới</span>
            <img src={plus} alt="icon add address" />
          </Link>

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
  );
}

export default ProfileAddress;