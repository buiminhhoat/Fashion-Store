import React from "react";
import { Link } from "react-router-dom";
import closeButton from "../images/close.svg";
import {formatter} from "@Utils/formatter.js"

function CartProduct({ product, handleDecreaseAmount, handleIncreaseAmount, handleChooseSize, handleCloseButton }) {

    const checkQuantity = () => {
        let stockQuantity = product.informationProduct.productQuantities.find((quantity) => quantity.sizeID === product.sizeID).quantity;
        // if (stockQuantity < product.quantityPurchase) {
        //     // handleDecreaseAmount(product.quantityPurchase - stockQuantity);
        //     // setReview(true);
        //     // console.log("cuu");
        // }

        return  Math.min(product.quantityPurchase, stockQuantity)
    }


    return (
        <div className="card-product d-flex">
            <div className="image-product">
                <Link to={"/product?productID=" + product.productID}>
                    <img src={product.informationProduct.productImages[0].imagePath} alt={""} />
                </Link>
            </div>
            <div className="product__info">
                <div className="product__name d-flex align-items-start justify-content-between">
                    <Link to={"/product?productID=" + product.productID}>
                        <h5 className="name">{product.informationProduct.productName}</h5>
                    </Link>
                    <img src={closeButton} alt="icon close" onClick={handleCloseButton} />
                </div>
                <div className="product__classify">
                    <div className="wrap-product-detail-properties d-flex ">
                        {product.informationProduct.productSizes ? (
                            product.informationProduct.productSizes.map((size, index) =>
                                product.informationProduct.productQuantities.find((quantity) => quantity.sizeID === size.sizeID) ? (
                                    product.informationProduct.productQuantities.find((quantity) => quantity.sizeID === size.sizeID).quantity === 0 ? (
                                        <div key={index} className="size-wrap size size-sold-out">
                                            {size.sizeName}
                                        </div>
                                    ) : (
                                        <div
                                            key={index}
                                            className={`size-wrap size ${product.sizeID === size.sizeID ? "selected-size" : ""}`}
                                            onClick={() => handleChooseSize(size.sizeID)}
                                        >
                                            {size.sizeName}
                                        </div>
                                    )
                                ) : (
                                    <></>
                                )
                            )
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="product__price d-flex align-items-center">
                    <div className="product__price__sale">{formatter(product.informationProduct.productPrice * product.quantityPurchase)}</div>
                </div>
                <div className="product__quantity d-flex">
                    <button type="button" className="btn btn-light product__quantity__icon d-flex align-items-center justify-content-center" onClick={() => handleDecreaseAmount(1)}>
                        -
                    </button>
                    <div className="d-flex align-items-center justify-content-center quantity">
                        {checkQuantity()}
                    </div>
                    <button type="button" className="btn btn-light product__quantity__icon d-flex align-items-center justify-content-center" onClick={handleIncreaseAmount}>
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartProduct;
