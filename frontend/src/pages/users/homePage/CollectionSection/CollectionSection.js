import {useState} from "react";
import './style.scss';
import ProductItem from "../../components/ProductItem/ProductItem";

const CollectionSection = ({collectionData}) => {
  // State để theo dõi tab đang được chọn
  const [activeTab, setActiveTab] = useState();

  // Hàm để chuyển tab
  const changeTab = (tabId) => {
    setActiveTab(tabId);
  };

  console.log(collectionData);

  return (
      <section className="collection">
        <div className="collection-wrap">
          <div className="title row">
            <p className="col-4">BỘ SƯU TẬP ÁO NAM</p>
            <div className="col-8 nav-wrap">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                {/*{collectionData.map((data) => (*/}
                {/*    <li className="nav-item" key={data.tab.categoryID} role="presentation">*/}
                {/*      <a*/}
                {/*          className={`nav-link ${activeTab === data.tab.categoryID ? 'active' : ''}`}*/}
                {/*          id={`${data.tab.categoryID}-tab`}*/}
                {/*          data-bs-toggle="tab"*/}
                {/*          role="tab"*/}
                {/*          aria-selected={activeTab === data.tab.categoryID ? 'true' : 'false'}*/}
                {/*          onClick={() => changeTab(data.tab.categoryID)}*/}
                {/*      >*/}
                {/*        {data.tab.categoryName}*/}
                {/*      </a>*/}
                {/*    </li>*/}
                {/*))}*/}
              </ul>
            </div>
          </div>
          <div className="product-list">
            {/*{collectionData.find((data) => data.tab.categoryID === activeTab).products.map((product, index) => (*/}
            {/*    <ProductItem key={index} product={product} />*/}
            {/*))}*/}
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
