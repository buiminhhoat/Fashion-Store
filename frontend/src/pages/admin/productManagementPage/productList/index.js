import React, {useEffect, useRef, useState} from "react";
import "./style.scss"
import {toast} from "react-toastify";
import {HiOutlineTrash} from "react-icons/hi";
import {BiSolidEdit} from "react-icons/bi";
import {MdArrowDropDown, MdArrowRight} from "react-icons/md";
import {TbListSearch} from "react-icons/tb";
import {IoSearch} from "react-icons/io5";

const ProductListPage  = () => {
  const inputRef = useRef(null);

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


  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e, categoryID) => {
    if (e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (file) {
      console.log('Đã chọn file:', file);
    }
  };

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
              <p className="category-title">DANH MỤC SẢN PHẨM</p>
              <div style={{boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.102)", overflow: "hidden", marginBottom:"10px",
                borderRadius:"3px", border:"2px solid #E4E4E4", padding:"0", backgroundColor:"#f9f9f9", height:"75px"}}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", height:"100%", paddingLeft:"35px"}}>
                  <div style={{color:"#333333", fontSize:"18px", fontWeight:"800", marginTop:"7px"}}>
                    <TbListSearch style={{padding:"0px 0 5px", fontSize:"30px", marginRight:"10px"}}/>
                    Tìm kiếm theo danh mục
                  </div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginRight:"35px"}}>
                    <div style={{display:"flex", alignItems:"center", height:"35px", borderBottom:"2px solid #ac0000"}}>
                      <input style={{width:"250px",backgroundColor:"#f9f9f9", border:"none", margin:"0 5px 0 5px",}} type="text"/>
                      <IoSearch style={{color:"#ac0000", padding:"0px 0 0px", fontSize:"20px", marginRight:"10px"}}/>
                    </div>
                  </div>

                </div>
              </div>

              <section>
                <div style={{boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.102)", overflow: "hidden",
                  borderRadius:"3px", border:"2px solid #E4E4E4", padding:"0", backgroundColor:"#f9f9f9"}}>

                  {
                    categories.map((category, index) => (
                        <div key={index}>
                          <div className={`pointer-cursor ${selectedCategoriesID.find((id) => id === category.categoryID) ? "selected-category-field" : "category-field"}`}
                               style={{borderTop: `${index !== 0 ? "2px solid #E4E4E4" : "none"}`}}
                               onClick={() => handleCategoryClick(category.categoryID)}
                          >
                            <div>
                              <div style={{color:`${selectedCategoriesID.find((id) => id === category.categoryID)?"#E4E4E4":"#9D9D9D"}`, fontSize:"17px", fontWeight:"600", marginTop:"7px"}}>
                                {
                                  selectedCategoriesID.find((id) => id === category.categoryID) ?
                                    <MdArrowDropDown style={{padding:"0px 0 5px", fontSize:"37px", marginRight:"5px"}}/>
                                  :
                                    <MdArrowRight style={{padding:"0px 0 5px", fontSize:"37px", marginRight:"5px"}}/>
                                }
                                {category.categoryName}
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
                              selectedCategoriesID.find((id) => id === category.categoryID) &&
                              category.subCategories &&
                              category.subCategories.map((subCategory, index) => (
                                <div key={index}>
                                  <div className="subCategory-field pointer-cursor"
                                       onClick={() => handleCategoryClick(subCategory.categoryID)}
                                  >
                                    <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", width: "100%", height:"100%"}}>
                                      <div style={{alignSelf: `${index !== category.subCategories.length - 1 ? "auto" : "flex-start"}`, width:"25px",
                                        height:`${index !== category.subCategories.length - 1 ? "100%" : "51%"}`, borderRight:"3px solid #a30000"}}/>

                                      <div style={{width:"20px", height:"2.5px", backgroundColor:"#a30000", border:"none"}}/>

                                      <div style={{borderRadius:"100%", border:"3px solid #a30000", padding:"2px"}}>
                                        <img
                                            id="action-upload"
                                            className="img-subCategory"
                                            src="https://i.imgur.com/cVeZv1A.png"
                                            alt=""
                                            onClick={handleImageClick}
                                        />
                                        <input
                                            type="file"
                                            ref={inputRef}
                                            accept="image/*"
                                            multiple="multiple"
                                            style={{ display: 'none' }}
                                            onChange={() => handleFileChange(subCategory.categoryID)}
                                        />
                                      </div>

                                      <div style={{marginLeft:"15px", fontSize:"17px", fontWeight:"600", color:"#9D9D9D"}}>
                                        {subCategory.categoryName}
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

                                  <div>
                                    {
                                      selectedCategoriesID.find((id) => id === subCategory.categoryID) &&
                                        subCategory.products &&
                                        subCategory.products.map((product, index) => (
                                          <div key={index}>
                                            <div className="subCategory-field">
                                              <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", width: "100%", height:"100%"}}>
                                                <div style={{alignSelf: `${index !== category.subCategories.length - 1 ? "auto" : "flex-start"}`, width:"25px",
                                                  height:`${index !== category.subCategories.length - 1 ? "100%" : "51%"}`, borderRight:"3px solid #a30000"}}/>

                                                <div style={{width:"20px", height:"2.5px", backgroundColor:"#a30000", border:"none"}}/>

                                                <div style={{borderRadius:"100%", border:"3px solid #a30000", padding:"2px"}}>
                                                  <img
                                                      className="img-subCategory"
                                                      src="https://i.imgur.com/cVeZv1A.png"
                                                      alt=""
                                                  />
                                                </div>

                                                <div style={{marginLeft:"15px", fontSize:"17px", fontWeight:"600", color:"#9D9D9D"}}>
                                                  {product.productName}
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
                                    }
                                  </div>
                                </div>
                              ))
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