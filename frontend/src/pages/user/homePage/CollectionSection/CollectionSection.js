import {useEffect, useState} from "react";
import './style.scss';
import ProductItem from "../../components/ProductItem/ProductItem";
import {Link} from "react-router-dom";

const CollectionSection = ({collectionData}) => {
  // State để theo dõi tab đang được chọn
  const [activeTab, setActiveTab] = useState(null);

  // Hàm để chuyển tab
  const changeTab = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    if (collectionData.subCategories.length > 0) {
      setActiveTab(collectionData.subCategories[0].categoryID);
    }
  }, []);

  return (
      <section className="collection">
        <div className="collection-wrap">
          <div className="title row">
            <p className="col-4">{collectionData.categoryName}</p>
            <div className="col-8 nav-wrap">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                {collectionData.subCategories.map((subCategory) => (
                    <li className="nav-item" key={subCategory.categoryID} role="presentation">
                      <a
                          className={`nav-link ${activeTab === subCategory.categoryID ? 'active' : ''}`}
                          id={`${subCategory.categoryID}-tab`}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-selected={activeTab === subCategory.categoryID ? 'true' : 'false'}
                          onClick={() => changeTab(subCategory.categoryID)}
                      >
                        {subCategory.categoryName}
                      </a>
                    </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="product-list">
            {(collectionData.subCategories.length > 0 ?
                (
                    (collectionData.subCategories.find((subCategory) => subCategory.categoryID === activeTab) ?
                    collectionData.subCategories.find((subCategory) => subCategory.categoryID === activeTab) :
                    collectionData.subCategories[0])
                        .products.map((product, index) => (<ProductItem key={index} product={product} />))
                )
                :
                (
                    <></>
                )
            )}
          </div>

          <div className="load-more-wrap text-center">
            <Link to={"/category?categoryID=" + activeTab}>
              <button className="btn btn-vm view-more-product btn-product-winter" id="view-more-product">
                Xem thêm <i className="fa-solid fa-spinner icon-loading"></i>
              </button>
            </Link>
          </div>
        </div>
      </section>
  );
}

export default CollectionSection;
