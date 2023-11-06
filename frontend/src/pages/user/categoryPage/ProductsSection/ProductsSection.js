import React from "react";
import './style.scss';
import ProductItem from "../../components/ProductItem/ProductItem";

const ProductsSection = ({productsData}) => {
    return (
        <section className="collection" style={{paddingBottom: 0}}>
            <div className="collection-wrap">
                <div className="product-list">
                    {productsData.map((product, index) => (
                        <ProductItem key={index} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProductsSection;