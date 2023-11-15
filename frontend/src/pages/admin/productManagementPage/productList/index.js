import React, {useEffect, useState} from "react";
import "./style.scss"
import {toast} from "react-toastify";
import {RiPriceTagLine} from "react-icons/ri";
import {HiOutlineTrash} from "react-icons/hi";
import {BiSolidEdit} from "react-icons/bi";

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



          <div className="container pe-0 ps-0" style={{marginTop: "10px", paddingBottom: "40px"}}>
            <div style={{margin:"0 70px 0 40px"}}>
              <p className="category-title">Danh mục</p>
              <section>
                <div style={{overflow: "hidden", borderRadius:"5px", border:"2px solid #E4E4E4", padding:"0", backgroundColor:"white"}}>

                  {
                    categories.map((category, index) => (
                        <div key={index}>
                          <div className={`pointer-cursor ${selectedCategoriesID.find((id) => id === category.categoryID) ? "selected-category-field" : "category-field"}`}
                               style={{borderTop: `${index !== 0 ? "2px solid #E4E4E4" : "none"}`}}
                               onClick={() => handleCategoryClick(category.categoryID)}
                          >
                            <div>
                              <div style={{color:`${selectedCategoriesID.find((id) => id === category.categoryID)?"#E4E4E4":"#9D9D9D"}`, fontSize:"17px", fontWeight:"600", marginTop:"7px"}}>
                                <RiPriceTagLine style={{padding:"0px 0 5px", fontSize:"30px", marginRight:"10px"}}/> {category.categoryName}
                              </div>

                            </div>
                            <div style={{display:"flex"}}>
                              <div className={`${selectedCategoriesID.find((id) => id === category.categoryID) ? "selected-btn-edit-category" : "btn-edit-category"}`}
                                   style={{marginRight:"20px"}}>
                                <HiOutlineTrash />
                              </div>
                              <div className={`${selectedCategoriesID.find((id) => id === category.categoryID) ? "selected-btn-edit-category" : "btn-edit-category"}`}
                                   style={{marginRight:"0"}}>
                                <BiSolidEdit />
                              </div>
                            </div>
                          </div>

                          <div>
                            {
                              selectedCategoriesID.find((id) => id === category.categoryID) ?
                                  category.subcategories.map((subcategory, index) => (
                                      <div key={index}>
                                        <div className="subcategory-field pointer-cursor">
                                          <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", width: "100%", height:"100%"}}>
                                            <div style={{alignSelf: `${index !== category.subcategories.length - 1 ? "auto" : "flex-start"}`, width:"25px",
                                              height:`${index !== category.subcategories.length - 1 ? "100%" : "51%"}`, borderRight:"3px solid #a30000"}}/>

                                            <div style={{width:"20px", height:"2.5px", backgroundColor:"#a30000", border:"none"}}/>

                                            <div style={{borderRadius:"100%", border:"3px solid #a30000", padding:"2px"}}>
                                              <img
                                                  className="img-subcategory"
                                                  src="https://i.imgur.com/cVeZv1A.png"
                                                  alt=""
                                              />
                                            </div>

                                            <div style={{marginLeft:"15px", fontSize:"17px", fontWeight:"600", color:"#9D9D9D"}}>
                                              {subcategory.categoryName}
                                            </div>
                                          </div>

                                          <div style={{display:"flex"}}>
                                            <div className="btn-edit-category"
                                                 style={{marginRight:"20px"}}>
                                              <HiOutlineTrash />
                                            </div>
                                            <div className="btn-edit-category"
                                                 style={{marginRight:"0"}}>
                                              <BiSolidEdit />
                                            </div>
                                          </div>

                                        </div>
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

        </main>
      </div>
  );
}

export default ProductListPage;