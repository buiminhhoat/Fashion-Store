import React, {useState} from "react";
import "./style.scss"

import ProductDetails from "../components/ProductDetails/ProductDetails";
import {toast} from "react-toastify";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import ConfirmDialog from "../../../../../components/dialogs/ConfirmDialog/ConfirmDialog";
import {ADD_PRODUCT_PAGE, API, BREADCRUMB, CONFIRM_DIALOG, MESSAGE} from "@Const";

const AddProductPage = () => {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const navigate = useNavigate();

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
      toast.warn(MESSAGE.MISSING_PRODUCT_IMAGE);
      return;
    }
    if (informationProduct.productName === "") {
      toast.warn(MESSAGE.MISSING_PRODUCT_NAME);
      return;
    }
    if (informationProduct.productPrice === "") {
      toast.warn(MESSAGE.MISSING_PRODUCT_PRICE);
      return;
    }
    if (informationProduct.productSizes.length === 0 || informationProduct.productQuantities.length === 0) {
      toast.warn(MESSAGE.MISSING_PRODUCT_SIZE);
      return;
    }

    for (let i = 0; i < informationProduct.productSizes.length; ++i) {
      if (!informationProduct.productSizes[i].sizeName) {
        toast.warn(MESSAGE.EMPTY_SIZE_NAME);
        return;
      }
    }

    for (let i = 0; i < informationProduct.productQuantities.length; ++i) {
      if (!informationProduct.productQuantities[i].quantity) {
        toast.warn(MESSAGE.EMPTY_QUANTITY);
        return;
      }
    }
    function isEmpty(obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    if (isEmpty(informationProduct.category) && isEmpty(informationProduct.parentCategory)) {
      toast.warn(MESSAGE.MISSING_PRODUCT_CATEGORY);
      return;
    }
    if (informationProduct.productDescription === "") {
      toast.warn(MESSAGE.MISSING_PRODUCT_DESCRIPTION);
      return;
    }

    const formData = new FormData();

    formData.append('productID', informationProduct.productID);
    formData.append('productName', informationProduct.productName);
    formData.append('productPrice', informationProduct.productPrice);
    formData.append('productDescription', informationProduct.productDescription);

    for (const file of productImages) { formData.append('productImages', file);}

    formData.append('categoryID', informationProduct.category.categoryID);
    formData.append('parentCategoryID', informationProduct.parentCategory.categoryID);

    formData.append('productQuantities', JSON.stringify(informationProduct.productQuantities));
    formData.append('productSizes', JSON.stringify(informationProduct.productSizes));

    fetch(API.ADMIN.ADD_PRODUCT_ENDPOINT, {
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
      toast.success(MESSAGE.ADD_PRODUCT_SUCCESS);
      // navigate(`/admin/management-page/categories-and-products`, {
      //   state: { scrolling: SCROLLING.SMOOTH },
      // });


      // console.log('Upload successful:', data);
      // window.localion.reload();
    })
    .catch((error) => {
      toast.error(MESSAGE.GENERIC_ERROR);
      // console.error('Upload failed:', error);
    });
  }

  return (
      <div id="app">
        <main id="main">
          <div className="container profile-wrap">
            <div className="breadcrumb-wrap">
              <a href="/">{BREADCRUMB.HOME_PAGE}</a>
              &gt; <span>{BREADCRUMB.PRODUCT_MANAGEMENT}</span>
              &gt; <span>{BREADCRUMB.ADD_PRODUCT}</span>
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
                      {ADD_PRODUCT_PAGE.SAVE_BTN}
                    </button>
                    <button type="button" className="product-details-btn product-details-btn-danger"
                            onClick={() => {setIsShowConfirmDialog(true)}}
                    >
                      {ADD_PRODUCT_PAGE.REFRESH_BTN}
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {isShowConfirmDialog && (
              <div className="modal-overlay">
                <ConfirmDialog title={<span style={{color:"#bd0000"}}>{CONFIRM_DIALOG.WARNING_TITLE}</span>}
                               subTitle={
                                 <>
                                   {CONFIRM_DIALOG.CONFIRM_REFRESH_DATA}
                                 </>
                               }
                               titleBtnAccept={CONFIRM_DIALOG.TITLE_BTN_ACCEPT}
                               titleBtnCancel={CONFIRM_DIALOG.TITLE_BTN_CANCEL}
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