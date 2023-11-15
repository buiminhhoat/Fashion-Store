import React from "react";
import './style.scss';
import ProductItem from "./ProductItem";

const ProductsSection = ({productsData}) => {
    return (
        <section className="product-result" style={{paddingBottom: 0}}>
            {/*<div className="collection-wrap">*/}
                <div className="product-list">
                    {productsData.map((product, index) => (
                        <ProductItem key={index} product={product} />
                    ))}
                </div>
            {/*</div>*/}
        </section>
    );
}

export default ProductsSection;