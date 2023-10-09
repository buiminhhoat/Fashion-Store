import { memo } from "react";
import './style.scss';

const CollectionSection = () => {
  return (
      <section className="collection">
        <div className="collection-wrap">
          <div className="title row">
            <p className="col-4">BỘ SƯU TẬP ÁO NAM</p>
            <div className="col-8 nav-wrap">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <a
                      className="nav-link active"
                      id="nav-collection-63e5ee4fa056b1c6920ed254-tab"
                      data-bs-toggle="tab"
                      href="#nav-collection-63e5ee4fa056b1c6920ed254"
                      role="tab"
                      aria-selected="true"
                  >
                    Áo Polo
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                      className="nav-link"
                      id="nav-collection-63e5ee4fa056b1c6920ed255-tab"
                      data-bs-toggle="tab"
                      href="#nav-collection-63e5ee4fa056b1c6920ed255"
                      role="tab"
                      aria-selected="false"
                  >
                    Áo Tshirt
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                      className="nav-link"
                      id="nav-collection-63e5ee4fa056b1c6920ed256-tab"
                      data-bs-toggle="tab"
                      href="#nav-collection-63e5ee4fa056b1c6920ed256"
                      role="tab"
                      aria-selected="false"
                  >
                    Áo Tanktop
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                      className="nav-link"
                      id="nav-collection-63e5ee4fa056b1c6920ed257-tab"
                      data-bs-toggle="tab"
                      href="#nav-collection-63e5ee4fa056b1c6920ed257"
                      role="tab"
                      aria-selected="false"
                  >
                    Áo Khoác Gió
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
  );
}

export default memo(CollectionSection);
