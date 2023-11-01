import {useEffect, useState} from "react";
import './style.scss';
import ProductItem from "../../components/ProductItem/ProductItem";

const CollectionSection = ({collectionData}) => {
  // State để theo dõi tab đang được chọn
  const [activeTab, setActiveTab] = useState(null);

  // Hàm để chuyển tab
  const changeTab = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    if (collectionData.content.length > 0) {
      setActiveTab(collectionData.content[0].tab.categoryID);
    }
  }, []);

  return (
      <section className="collection">
        <div className="collection-wrap">
          <div className="title row">
            <p className="col-4">{collectionData.name}</p>
            <div className="col-8 nav-wrap">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                {collectionData.content.map((subcollection) => (
                    <li className="nav-item" key={subcollection.tab.categoryID} role="presentation">
                      <a
                          className={`nav-link ${activeTab === subcollection.tab.categoryID ? 'active' : ''}`}
                          id={`${subcollection.tab.categoryID}-tab`}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-selected={activeTab === subcollection.tab.categoryID ? 'true' : 'false'}
                          onClick={() => changeTab(subcollection.tab.categoryID)}
                      >
                        {subcollection.tab.categoryName}
                      </a>
                    </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="product-list">
            {(collectionData.content.length > 0 ?
                (
                    (collectionData.content.find((subcollection) => subcollection.tab.categoryID === activeTab) ?
                    collectionData.content.find((subcollection) => subcollection.tab.categoryID === activeTab) :
                    collectionData.content[0])
                        .products.map((product, index) => (<ProductItem key={index} product={product} />))
                )
                :
                (
                    <></>
                )
            )}
          </div>

          <div className="load-more-wrap text-center">
            <a href="#">
              <button className="btn btn-vm view-more-product btn-product-winter" id="view-more-product">
                Xem thêm <i className="fa-solid fa-spinner icon-loading"></i>
              </button>
            </a>
          </div>
        </div>
      </section>
  );
}

export default CollectionSection;
