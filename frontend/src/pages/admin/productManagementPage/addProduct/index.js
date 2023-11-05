import React, {useState} from "react";
import "./style.scss"

import ProductDetails from "../ProductDetails/ProductDetails";
import {toast} from "react-toastify";

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [selectedCategoriesNameID, setSelectedCategoriesNameID] = useState(null);
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productSizeQuantity, setProductSizeQuantity] = useState([]);

  async function addProduct() {
    if (productName === "") {
      toast.warn("Vui lòng nhập thông tin tên sản phẩm");
      return;
    }
    if (productPrice === "") {
      toast.warn("Vui lòng nhập giá sản phẩm");
      return;
    }
    if (selectedCategoriesNameID.length < 2) {
      toast.warn("Vui lòng cho danh mục sản phẩm");
      return;
    }
    if (productDescription === "") {
      toast.warn("Vui lòng nhập mô tả sản phẩm");
      return;
    }

    const formData = new FormData();

    for (const file of productImages) {
      formData.append('productImages', file);
    }

    formData.append('productName', productName);

    formData.append('productPrice', productPrice);

    formData.append('ParentCategoryID', selectedCategoriesNameID[0].categoryID);
    formData.append('CategoryID', selectedCategoriesNameID[1].categoryID);

    formData.append('productSizeQuantity', JSON.stringify(productSizeQuantity));
    console.log(selectedCategoriesNameID);

    formData.append('productDescription', productDescription);


    let apiAddProductUrl = "http://localhost:9999/api/add-product";
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
          console.log('Upload successful:', data);
        })
        .catch((error) => {
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
            <ProductDetails setParentProductName={setProductName}
                            setParentProductPrice={setProductPrice}
                            setParentSelectedCategoriesNameID={setSelectedCategoriesNameID}
                            setParentProductDescription={setProductDescription}
                            setParentProductImages={setProductImages}
                            setParentProductSizeQuantity={setProductSizeQuantity}/>

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