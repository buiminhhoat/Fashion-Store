import {useState} from "react";
import './style.scss';
import ProductItem from "../../components/ProductItem/ProductItem";

const CollectionSection = ({collectionData}) => {
  // State để theo dõi tab đang được chọn
  const [activeTab, setActiveTab] = useState("tab-1");

  // Hàm để chuyển tab
  const changeTab = (tabId) => {
    setActiveTab(tabId);
  };

  return (
      <section className="collection">
        <div className="collection-wrap">
          <div className="title row">
            <p className="col-4">BỘ SƯU TẬP ÁO NAM</p>
            <div className="col-8 nav-wrap">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                {collectionData.map((data) => (
                    <li className="nav-item" key={data.tab.id} role="presentation">
                      <a
                          className={`nav-link ${activeTab === data.tab.id ? 'active' : ''}`}
                          id={`${data.tab.id}-tab`}
                          data-bs-toggle="tab"
                          role="tab"
                          aria-selected={activeTab === data.tab.id ? 'true' : 'false'}
                          onClick={() => changeTab(data.tab.id)}
                      >
                        {data.tab.title}
                      </a>
                    </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="product-list">
            {collectionData.find((data) => data.tab.id === activeTab).products.map((product, index) => (
                <ProductItem key={index} product={product} />
            ))}
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
