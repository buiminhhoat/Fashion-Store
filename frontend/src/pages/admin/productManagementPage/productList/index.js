import React, {useEffect, useState} from "react";
import "./style.scss"
import {toast} from "react-toastify";

const ProductListPage  = () => {
  const [selectedCategoriesID, setSelectedCategoriesID] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    const apiGetCategory = "http://localhost:9999/api/public/get-all-categories";
    try {
      const response = await fetch(apiGetCategory, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        console.log("apiGetCategory");
        console.log(data);

        setCategories(data);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Không kết nối được với database");
    }
  }

  useEffect(() => {
    fetchData().then(r => {});
  }, []);


  const handleCategoryClick = (categoryID) => {
      if (selectedCategoriesID.includes(categoryID)) {
        const updatedCategoriesID = selectedCategoriesID.filter((id) => id !== categoryID);
        setSelectedCategoriesID(updatedCategoriesID);
      } else {
        const updatedCategoriesID = [...selectedCategoriesID, categoryID];
        setSelectedCategoriesID(updatedCategoriesID);
      }
  }

  return (
      <div id="app">
        <main id="main">
          <div className="container profile-wrap">
            <div className="breadcrumb-wrap">
              <a href="/">Trang chủ</a>
              &gt; <span>Quản lý sản phẩm</span>
            </div>
          </div>

          <div className="container pe-0 ps-0" style={{marginTop: "10px"}}>
            <div data-v-03749d40="" className="product-edit__container">
              <div data-v-03749d40="" className="product-edit">
                <section data-v-03749d40="" className="product-edit__section">
                  <div data-v-2250a4e1="" data-v-54a51dd8="" data-v-03749d40="" className="product-detail-panel product-basic-info" >


                    {
                      categories.map((category, index) => (
                        <div key={index}>
                          <div onClick={() => handleCategoryClick(category.categoryID)}>
                            {category.categoryName}
                          </div>

                          <div style={{marginLeft:"20px"}}>
                            {
                              selectedCategoriesID.find((id) => id === category.categoryID) ?
                                category.subcategories.map((subcategory, index) => (
                                  <div onClick={() => handleCategoryClick(subcategory.categoryID)}>
                                    {subcategory.categoryName}
                                  </div>
                                ))
                              : <></>
                            }
                          </div>
                        </div>
                      ))
                    }


                  </div>
                </section>
              </div>
            </div>
          </div>

        </main>
      </div>
  );
}

export default ProductListPage;