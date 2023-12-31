import "./style.scss"
import ProductDetails from "../components/ProductDetails/ProductDetails";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";
import queryString from "query-string";
import {useCookies} from "react-cookie";
import ConfirmDialog from "../../../../../components/dialogs/ConfirmDialog/ConfirmDialog";
import {API, MESSAGE, SCROLLING} from "../../../../../utils/const";

const EditProductPage = () => {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const productID = queryParams.productID;

  const [isShowConfirmDialog, setIsShowConfirmDialog] = useState(false);

  const [productImages, setProductImages] = useState([]);
  const [informationProduct, setInformationProduct] = useState({
    productID: productID,
    productName: "",
    productPrice: "",
    productDescription: "",
    productQuantities: [],
    productSizes: [],
    category:{},
    parentCategory:{},
  });

  async function editProduct() {
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

    formData.append('parentCategoryID', informationProduct.parentCategory.categoryID);
    formData.append('categoryID', informationProduct.category.categoryID);

    formData.append('productSizes', JSON.stringify(informationProduct.productSizes));
    formData.append('productQuantities', JSON.stringify(informationProduct.productQuantities));

    // formData.append('productSizeQuantity', JSON.stringify(productSizeQuantity));

    let apiAddProductUrl = "/api/admin/edit-product";
    fetch(apiAddProductUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      return response.json();
    })
    .then((data) => {
      toast.success(MESSAGE.EDIT_PRODUCT_SUCCESS);
      navigate(`/admin/management-page/categories-and-products`, {
        state: { scrolling: SCROLLING.SMOOTH },
      });
    })
    .catch((error) => {
      toast.error(MESSAGE.GENERIC_ERROR);
    });
  }

  async function fetchImageAsFile(imageUrl, imageName) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], imageName, {type: blob.type});
  }

  const fetchData = async () => {
    const apiProductDetailByID = API.PUBLIC.PRODUCT_ENDPOINT + productID;
    try {
      const response = await fetch(apiProductDetailByID, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setInformationProduct(data);

        const fetchImagePromises = data.productImages.map(imageData => {
          const imageUrl = imageData.imagePath;
          return fetchImageAsFile(imageUrl, imageData.imagePath);
        });

        Promise.all(fetchImagePromises)
            .then(files => {
              setProductImages(files);
            })
            .catch(error => {
              console.error("Error loading images:", error);
            });

      } else {
        const data = await response.json();
        console.log(data.message);
        navigate(`/error`);
      }
    } catch (error) {
      console.log(error);
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  }

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

  return (
      <div id="app">
        <main id="main">
          <div className="container profile-wrap">
            <div className="breadcrumb-wrap">
              <a href="/">Trang chủ</a>
              &gt; <span>Quản lý sản phẩm</span>
              &gt; <span>Chỉnh sửa thông tin sản phẩm</span>
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
                    <button type="button" className="product-details-btn" onClick={editProduct}>
                      Lưu lại
                    </button>
                    <button type="button" className="product-details-btn product-details-btn-danger"
                            onClick={() => {setIsShowConfirmDialog(true)}}
                    >
                      Hủy thay đổi
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>

        </main>

        {isShowConfirmDialog && (
            <div className="modal-overlay">
              <ConfirmDialog title={<span style={{color:"#bd0000"}}>Cảnh báo</span>}
                             subTitle={
                               <>
                                 Bạn có chắc chắn muốn hủy? Thao tác này sẽ đưa dữ liệu về trạng thái cuối cùng được lưu lại.
                               </>
                             }
                             titleBtnAccept={"Có"}
                             titleBtnCancel={"Không"}
                             onAccept={() => {
                               fetchData().then(r => {setIsShowConfirmDialog(false)});
                             }}
                             onCancel={() => {setIsShowConfirmDialog(false)}}/>
            </div>
        )}
      </div>
  );
}

export default EditProductPage;