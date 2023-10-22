import {memo} from "react";
import "./style.scss"

const ProductManagementPage = () => {
  return (
      <main id="main">
        <div data-v-0aa43d6b="" className="page">
          <div data-v-0aa43d6b="" className="product">
            <div data-v-1eecaf6a="" data-v-0aa43d6b="" className="product-new">
              <div data-v-03749d40="" data-v-1eecaf6a="" className="product-edit" data-education-current-key="category">
                <div data-v-03749d40="" className="product-edit__container">
                  <div data-v-03749d40="" className="product-edit__main">

                    <section data-v-03749d40="" className="product-edit__section">
                      <div data-v-2250a4e1="" data-v-54a51dd8="" data-v-03749d40="" className="product-detail-panel product-basic-info">
                        <div data-v-2250a4e1="" className="panel-header">

                          <div data-v-2250a4e1="" className="panel-title">
                            <div data-v-54a51dd8="" data-v-2250a4e1="" className="basic-info-title">
                              Thông tin cơ bản
                            </div>
                          </div>


                        </div>
                      </div>
                    </section>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}

export default memo(ProductManagementPage);