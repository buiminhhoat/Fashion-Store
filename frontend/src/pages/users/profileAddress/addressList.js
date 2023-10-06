import React from 'react';

let addresses = [
    {
        id: "65201956a33b82cac209f638",
        name: "Bùi Minh Hoạt",
        phone: "0945405238",
        isDefault: true,
        address: "144 Xuân Thủy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Hà Nội",
        editLink: "https://5sfashion.vn/profile/address/65201956a33b82cac209f638",
    },
    // Thêm các địa chỉ khác vào đây nếu cần
];

function addressList() {
    return (
        <div>
            {addresses.map((address) => (
                <div className="box-address" key={address.id}>
                    <div className="item-address-wrap" data-item-address-id={address.id}>
                        <div className="information">
                            <span className="name">{address.name}</span>
                            <div className="break-item">|</div>
                            <span className="phone">{address.phone}</span>
                            {address.isDefault && <div className="default-address">Mặc định</div>}
                        </div>
                        <div className="address">
                            <span>{address.address}</span>
                        </div>
                        <div className="box-btn-wrap">
                            <div className="btn-wrap-item">
                                <a href={address.editLink} className="edit">Sửa</a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default addressList;
