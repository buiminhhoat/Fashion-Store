import React, {useState} from "react";
import "./style.scss"

import ProductDetails from "../components/ProductDetails/ProductDetails";
import {toast} from "react-toastify";
import {useLocation, useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import ConfirmDialog from "../../../../../components/dialogs/ConfirmDialog/ConfirmDialog";

const AddProductPage = () => {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const location = useLocation();

  const { productID } = useParams();
  const [productImages, setProductImages] = useState([]);

  const [isShowConfirmDialog, setIsShowConfirmDialog] = useState(false);

  const [informationProduct, setInformationProduct] = useState({
    productID: productID,
    productName: "",
    productPrice: "",
    productDescription: "",
    productQuantities: [],
    productSizes: [],
    category: location.state?.subCategory ?? {},
    parentCategory:location.state?.category ?? {},
  });

  async function addProduct() {
    if (productImages.length === 0) {
      toast.warn("Vui lòng thêm hình ảnh sản phẩm");
      return;
    }
    if (informationProduct.productName === "") {
      toast.warn("Vui lòng nhập tên sản phẩm");
      return;
    }
    if (informationProduct.productPrice === "") {
      toast.warn("Vui lòng nhập giá sản phẩm");
      return;
    }
    if (informationProduct.productSizes.length === 0 || informationProduct.productQuantities.length === 0) {
      toast.warn("Vui lòng thêm kích cỡ sản phẩm");
      return;
    }

    for (let i = 0; i < informationProduct.productSizes.length; ++i) {
      if (!informationProduct.productSizes[i].sizeName) {
        toast.warn("Tên kích cỡ không được để trống");
        return;
      }
    }

    for (let i = 0; i < informationProduct.productQuantities.length; ++i) {
      if (!informationProduct.productQuantities[i].sizeName) {
        toast.warn("Số lượng không được để trống");
        return;
      }
    }

    if (informationProduct.category === {} && informationProduct.parentCategory === {}) {
      toast.warn("Vui lòng chọn danh mục sản phẩm");
      return;
    }
    if (informationProduct.productDescription === "") {
      toast.warn("Vui lòng nhập mô tả sản phẩm");
      return;
    }

    const formData = new FormData();

    formData.append('productID', informationProduct.productID);
    formData.append('productName', informationProduct.productName);
    formData.append('productPrice', informationProduct.productPrice);
    formData.append('productDescription', informationProduct.productDescription);

    for (const file of productImages) { formData.append('productImages', file);}

    formData.append('CategoryID', informationProduct.category.categoryID);
    formData.append('ParentCategoryID', informationProduct.parentCategory.categoryID);

    formData.append('productQuantities', JSON.stringify(informationProduct.productQuantities));
    formData.append('productSizes', JSON.stringify(informationProduct.productSizes));

    let apiAddProductUrl = "/api/admin/add-product";
    fetch(apiAddProductUrl, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
      body: formData,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      return response.json();
    })
    .then((data) => {
      toast.success("Thêm sản phẩm thành công");
      console.log('Upload successful:', data);
      // window.localion.reload();
    })
    .catch((error) => {
      toast.error("Có lỗi xảy ra! Vui lòng thử lại");
      console.error('Upload failed:', error);
    });
  }

  return (
      <div id="app">
        <main id="main">
          <div className="container profile-wrap">
            <div className="breadcrumb-wrap">
              <a href="/">Trang chủ</a>
              &gt; <span>Quản lý sản phẩm</span>
              &gt; <span>Thêm sản phẩm</span>
            </div>
          </div>

          <div className="container pe-0 ps-0" style={{marginTop: "10px"}}>
            <ProductDetails informationProduct={informationProduct}
                            setInformationProduct={setInformationProduct}
                            productImages={productImages}
                            setProductImages={setProductImages}
            />

            <div data-v-03749d40="" className="product-edit__container">
              <div data-v-03749d40="" className="product-edit">
                <section style={{ marginBottom:"50px" }}>
                  <div className="button-container">
                    <button type="button" className="product-details-btn" onClick={addProduct}>
                      Lưu lại
                    </button>
                    <button type="button" className="product-details-btn product-details-btn-danger"
                            onClick={() => {setIsShowConfirmDialog(true)}}
                    >
                      Hủy Bỏ
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {isShowConfirmDialog && (
              <div className="modal-overlay">
                <ConfirmDialog title={<span style={{color:"#bd0000"}}>Cảnh báo</span>}
                               subTitle={
                                 <>
                                   Bạn có chắc chắn muốn hủy? Thao tác này sẽ làm mới tất cả dữ liệu đã nhập.
                                 </>
                               }
                               titleBtnAccept={"Có"}
                               titleBtnCancel={"Không"}
                               onAccept={() => {
                                 setInformationProduct({
                                     productID: productID,
                                     productName: "",
                                     productPrice: "",
                                     productDescription: "",
                                     productQuantities: [],
                                     productSizes: [],
                                     category: location.state?.subCategory ?? {},
                                     parentCategory:location.state?.category ?? {},
                                 });
                                 setProductImages([]);
                                 setIsShowConfirmDialog(false);
                               }}
                               onCancel={() => {setIsShowConfirmDialog(false)}}/>
              </div>
          )}

        </main>
      </div>
  );
}

export default AddProductPage;