import React, {useState} from "react";
import "./style.scss"

import ProductDetails from "../components/ProductDetails/ProductDetails";
import {toast} from "react-toastify";
import {useLocation, useParams} from "react-router-dom";

const AddProductPage = () => {
  const location = useLocation();
  const category = location.state;

  const { productID } = useParams();
  const [productImages, setProductImages] = useState([]);

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
    if (informationProduct.productName === "") {
      toast.warn("Vui lòng nhập thông tin tên sản phẩm");
      return;
    }
    if (informationProduct.productPrice === "") {
      toast.warn("Vui lòng nhập giá sản phẩm");
      return;
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

    console.log(JSON.stringify(informationProduct.productQuantities));
    console.log(JSON.stringify(informationProduct.productSizes));

    // formData.append('productSizeQuantity', JSON.stringify(productSizeQuantity));

    let apiAddProductUrl = "/api/admin/add-product";
    fetch(apiAddProductUrl, {
      method: 'POST',
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
                    <button type="button" className="product-details-btn product-details-btn-danger">
                      Hủy thay đổi
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>

        </main>
      </div>
  );
}

export default AddProductPage;