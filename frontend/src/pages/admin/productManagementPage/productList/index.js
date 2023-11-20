import React, {useEffect, useRef, useState} from "react";
import "./style.scss"
import {toast} from "react-toastify";
import {HiOutlineTrash} from "react-icons/hi";
import {BiSolidEdit} from "react-icons/bi";
import {MdArrowDropDown, MdArrowRight, MdLibraryAdd} from "react-icons/md";
import {TbListSearch} from "react-icons/tb";
import {IoSearch} from "react-icons/io5";
import {useCookies} from "react-cookie";
import ConfirmDialog from "../../../../components/dialogs/ConfirmDialog/ConfirmDialog";
import {useNavigate} from "react-router-dom";

const SEARCH = {
  CATEGORY: "",
  SUB_CATEGORY: "sub-category",
  PRODUCT: "product"
}

const ProductListPage  = () => {
  const navigate = useNavigate();

  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const [deletedCategory, setDeletedCategory] = useState(null);
  const [deletedProduct, setDeletedProduct] = useState(null);

  const [selectedCategoriesID, setSelectedCategoriesID] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesImgID, setCategoriesImgID] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");

  const  fetchImageAsFile = async (imageUrl, imageName, categoryID) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return {
      categoryID: categoryID,
      imageFile: new File([blob], imageName, {type: blob.type})
    };
  }

  const fetchData = async () => {
    const apiGetCategory = "/api/public/get-all-categories";
    try {
      const response = await fetch(apiGetCategory, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        console.log("apiGetCategory");
        console.log(data);

        setCategories(data);

        const fetchImagePromises = data.flatMap(category =>
            category.subCategories.map(subCategory => {
              const imageUrl = "/storage/images/" + subCategory.imagePath;
              return fetchImageAsFile(imageUrl, subCategory.imagePath, subCategory.categoryID);
            })
        );

        Promise.all(fetchImagePromises)
            .then(files => {
              setCategoriesImgID(files);
            })
            .catch(error => {
              console.error("Error loading images:", error);
            });


      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Không thể kết nối được với database");
    }
  }

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

  // useEffect(() => {
  //   console.log("categories");
  //   console.log(categories);
  // }, [categories]);

  const changeImageCategory = async (imageFile, categoryID) => {
    const formData = new FormData();
    formData.append('categoryID', categoryID);
    formData.append('categoryImage', imageFile);

    let apiUploadCategoryImageUrl = "/api/admin/upload-category-image";
    try {
      const response = await fetch(apiUploadCategoryImageUrl, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.status === 404) {
        toast.error("Không thể kết nối được với database");
        console.error('API endpoint not found:', apiUploadCategoryImageUrl);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        console.log('Upload successful:', data);

        const newCategoriesImgID = categoriesImgID.map(imgID => {
          return (imgID.categoryID === categoryID ? { ...imgID, imageFile: imageFile } : imgID);
        });
        setCategoriesImgID(newCategoriesImgID);
        // fetchData();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Không thể kết nối được với database");
      console.error('Failed:', error);
    }
  }

  const handleImageClick = (e, categoryID) => {
    e.stopPropagation();
    document.getElementById(`img-input-${categoryID}`).click();
  };

  const handleInputImageClick = (e) => {
    e.stopPropagation();
  };

  const handleFileChange = (e, categoryID) => {
    e.stopPropagation();
    if (e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (file) {
      changeImageCategory(file, categoryID).then(r => {});
      console.log('Đã chọn file:', file);
    }
  };

  const fetchProductData = async (categoryID) => {
    const apiProductByCategoryID = "/api/public/category/" + categoryID;
    try {
      const response = await fetch(apiProductByCategoryID, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        console.log("apiProductByCategoryID");
        console.log(data);
        setCategories((newCategories) =>
            newCategories.map((category) => ({
              ...category,
              subCategories: category.subCategories.map((subCategory) =>
                  subCategory.categoryID === data.categoryID ? data : subCategory
              ),
            }))
        );

      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Không thể kết nối được với database");
    }
  }

  const handleCategoryClick = (categoryID, type) => {
    if (selectedCategoriesID.includes(categoryID)) {
      const updatedCategoriesID = selectedCategoriesID.filter((id) => id !== categoryID);
      setSelectedCategoriesID(updatedCategoriesID);
    } else {
      const updatedCategoriesID = [...selectedCategoriesID, categoryID];
      // const updatedCategoriesID = [categoryID];
      setSelectedCategoriesID(updatedCategoriesID);
    }
    if (type === "sub-category") {
      fetchProductData(categoryID).then(r => {});
    }
  }

  const deleteCategory = async () => {
    const formData = new FormData();
    formData.append('categoryID', deletedCategory.categoryID);

    let apiDeleteCategoryUrl = "/api/admin/delete-category";
    try {
      const response = await fetch(apiDeleteCategoryUrl, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.status === 404) {
        toast.error("Không thể kết nối được với database");
        console.error('API endpoint not found:', apiDeleteCategoryUrl);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setCategories((newCategories) =>
            newCategories.map((category) => ({
              ...category,
              subCategories: category.subCategories.filter(
                  (subCategory) => subCategory.categoryID !== deletedCategory.categoryID
              ),
            })).filter((category) => category.categoryID !== deletedCategory.categoryID)
        );
        setDeletedCategory(null);

        // fetchData();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Không thể kết nối được với database");
      console.error('Failed:', error);
    }
  }

  const deleteProduct = async () => {
    const formData = new FormData();
    formData.append('productID', deletedProduct.productID);

    let apiDeleteProductUrl = "/api/admin/delete-product";
    try {
      const response = await fetch(apiDeleteProductUrl, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.status === 404) {
        toast.error("Không thể kết nối được với database");
        console.error('API endpoint not found:', apiDeleteProductUrl);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setCategories((newCategories) =>
            newCategories.map((category) => ({
              ...category,
              subCategories: category.subCategories.map((subCategory) => ({
                ...subCategory,
                products: subCategory.products.filter(
                    (product) => product.productID !== deletedProduct.productID
                ),
              })),
            }))
        );
        setDeletedProduct(null);
        // fetchData();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Không thể kết nối được với database");
      console.error('Failed:', error);
    }
  }

  const handleBtnDeleteCategoryClick = (e, categoryID, categoryName, type) => {
    e.stopPropagation();
    setDeletedCategory({
      type: type,
      categoryID: categoryID,
      categoryName: categoryName,
    })
  }

  // const handleBtnEditProductClick = (e, productID) => {
  //   e.stopPropagation();
  //   // window.open(`/admin/product-management-page/edit-product?productID=${productID}`, '_blank');
  //   navigate(`/admin/product-management-page/edit-product?productID=${productID}`);
  // }

  const handleBtnDeleteProductClick = (e, productID, productName) => {
    e.stopPropagation();
    setDeletedProduct({
      productID: productID,
      productName: productName,
    })
  }

  const handleSelectChange = (event) => {
    setSelectedSearch(event.target.value);
    handleBtnSearchClick();
  };

  const handleBtnSearchClick = () => {
    function removeAccents(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Loại bỏ dấu từ chuỗi
    }

    function isSubstringIgnoreCaseAndAccents(keyword, str) {
      const lowerCaseA = removeAccents(keyword.toLowerCase());
      const lowerCaseB = removeAccents(str.toLowerCase());
      return lowerCaseB.includes(lowerCaseA);
    }

    switch (selectedSearch) {
      case SEARCH.CATEGORY:
        fetchData().then(r => {
          setSelectedCategoriesID([]);
          setCategories((newCategories) =>
              newCategories.filter((category) =>
                  isSubstringIgnoreCaseAndAccents(searchInputValue, category.categoryName)
              )
          );
        });

        break;
      case SEARCH.SUB_CATEGORY:
        fetchData().then(r => {
          setSelectedCategoriesID([]);
          setCategories((newCategories) =>
            newCategories.map((category) => ({
              ...category,
              subCategories: category.subCategories.filter(
                  (subCategory) => isSubstringIgnoreCaseAndAccents(searchInputValue, subCategory.categoryName)
              ),
            }))
          );
        });
        break;
      case SEARCH.PRODUCT:
        // fetchData().then(r => {
        //   setSelectedCategoriesID([]);
        //   setCategories((newCategories) =>
        //       newCategories.map((category) => ({
        //         ...category,
        //         subCategories: category.subCategories.map((subCategory) => ({
        //           ...subCategory,
        //           products: subCategory.products.filter(
        //               (product) => isSubstringIgnoreCaseAndAccents(searchInputValue, product.productName)
        //           ),
        //         })),
        //       }))
        //   );
        // });
        break;
    }
  };

  const ListSection = () => {
    return (
        <div>
          { categories &&
              categories.length > 0 &&
              <section>
                <div style={{boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.102)", overflow: "hidden",
                  borderRadius:"4px", border:"2px solid #E4E4E4", padding:"0", backgroundColor:"#f9f9f9"}}>

                  {
                    categories.map((category, index) => (
                        <div key={index}>
                          { selectedSearch !== SEARCH.SUB_CATEGORY &&
                              <div className={`pointer-cursor ${selectedCategoriesID.find((id) => id === category.categoryID) ? "selected-category-field" : "category-field"}`}
                                   style={{borderTop: `${index !== 0 ? "2px solid #E4E4E4" : "none"}`}}
                                   onClick={() => handleCategoryClick(category.categoryID, "category")}
                              >
                                <div>
                                  <div style={{color:`${selectedCategoriesID.find((id) => id === category.categoryID)?"#E4E4E4":"#9D9D9D"}`, fontSize:"17px", fontWeight:"600", marginTop:"7px"}}>
                                    {
                                      selectedCategoriesID.find((id) => id === category.categoryID) ?
                                          <MdArrowDropDown style={{padding:"0px 0 5px", fontSize:"37px", marginRight:"5px"}}/>
                                          :
                                          <MdArrowRight style={{padding:"0px 0 5px", fontSize:"37px", marginRight:"5px"}}/>
                                    }
                                    <a className="hover-underline-animation"
                                       href={`/category?categoryID=${category.categoryID}`}
                                       style={{color:`${selectedCategoriesID.find((id) => id === category.categoryID)?"#E4E4E4":"#9D9D9D"}`,}}
                                    >
                                      {category.categoryName}
                                    </a>

                                  </div>

                                </div>
                                <div style={{display:"flex"}}>
                                  <div className={`${selectedCategoriesID.find((id) => id === category.categoryID) ? "selected-btn-edit-category" : "btn-edit-category"}`}
                                       style={{marginRight:"20px"}}
                                       onClick={(e) => handleBtnDeleteCategoryClick(e, category.categoryID, category.categoryName, "category")}
                                  >
                                    <HiOutlineTrash />
                                  </div>
                                  <div className={`${selectedCategoriesID.find((id) => id === category.categoryID) ? "selected-btn-edit-category" : "btn-edit-category"}`}
                                       style={{marginRight:"0"}}>
                                    <BiSolidEdit />
                                  </div>
                                </div>
                              </div>
                          }

                          <div>
                            {
                                (selectedCategoriesID.find((id) => id === category.categoryID) || selectedSearch === SEARCH.SUB_CATEGORY) &&
                                category.subCategories &&
                                category.subCategories.map((subCategory, subCategoryIndex) => (
                                    <div key={subCategoryIndex}>
                                      <div className={`${selectedSearch !== SEARCH.SUB_CATEGORY ? "subCategory-field" : "search-subCategory-field"} pointer-cursor`}
                                           onClick={() => handleCategoryClick(subCategory.categoryID, "sub-category")}
                                      >
                                        <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", width: "100%", height:"100%"}}>

                                          <div style={{alignSelf: "flex-start", width:"25px",
                                            height:`${subCategoryIndex !== category.subCategories.length - 1 ? "100%" : "51%"}`,
                                            borderRight:`${selectedSearch !== SEARCH.SUB_CATEGORY ? "3px solid #a30000" : "3px"}`}}/>

                                          <div style={{width:"20px", height:"2.5px", border:"none",
                                            backgroundColor:`${selectedSearch !== SEARCH.SUB_CATEGORY ? "#a30000" : ""}`}}/>

                                          <div style={{height:"100%", position: "relative", display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                                            <div style={{zIndex:"1", borderRadius:"100%", border:"3px solid #a30000", padding:"2px", backgroundColor:"white"}}>
                                              <img
                                                  id="action-upload"
                                                  className="img-subCategory"
                                                  src={categoriesImgID.find((imgID) => imgID.categoryID === subCategory.categoryID) ?
                                                      URL.createObjectURL(categoriesImgID.find((imgID) => imgID.categoryID === subCategory.categoryID).imageFile) : ""}
                                                  alt=""
                                                  onClick={(e) => handleImageClick(e, subCategory.categoryID)}
                                              />
                                              <input
                                                  type="file"
                                                  id={`img-input-${subCategory.categoryID}`}
                                                  accept="image/*"
                                                  multiple="multiple"
                                                  style={{ display: 'none' }}
                                                  onClick={(e) => handleInputImageClick(e)}
                                                  onChange={(e) => handleFileChange(e, subCategory.categoryID)}
                                              />
                                            </div>
                                            { selectedCategoriesID.find((id) => id === subCategory.categoryID) &&
                                                subCategory.products &&
                                                subCategory.products.length > 0 &&
                                                <div style={{position:"absolute", zIndex:"0", alignSelf: "flex-end", width:"5px",
                                                  height:"51%", borderRight:"3px solid #a30000",
                                                  marginLeft:"25px"}}/>
                                            }
                                          </div>

                                          <a className="hover-underline-animation"
                                             href={`/category?categoryID=${subCategory.categoryID}`}
                                             style={{marginLeft:"15px", fontSize:"17px", fontWeight:"600", color:"#9D9D9D"}}
                                          >
                                            {subCategory.categoryName}
                                          </a>
                                        </div>

                                        <div style={{display:"flex"}}>
                                          <div className="btn-edit-category"
                                               style={{marginRight:"20px"}}
                                               onClick={(e) => handleBtnDeleteCategoryClick(e, subCategory.categoryID, subCategory.categoryName, "sub-category")}
                                          >
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
                                            subCategory.products.map((product, productIndex) => (
                                                <div key={productIndex}>
                                                  <div className={`${selectedSearch !== SEARCH.SUB_CATEGORY ? "product-field" : "search-product-field"}`}>
                                                    <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", width: "100%", height:"100%"}}>
                                                      <div style={{alignSelf: "flex-start", width:"25px", height:"100%",
                                                        borderRight:`${subCategoryIndex !== category.subCategories.length - 1 && selectedSearch !== SEARCH.SUB_CATEGORY  ? "3px solid #a30000":"3px"}`}}/>

                                                      <div style={{alignSelf: "flex-start", width:"25px",
                                                        height:`${productIndex !== subCategory.products.length - 1 ? "100%" : "51%"}`, borderRight:"3px solid #a30000",
                                                        marginLeft:"25px"}}/>

                                                      <div style={{width:"20px", height:"2.5px", backgroundColor:"#a30000", border:"none"}}/>

                                                      <div style={{borderRadius:"100%", border:"3px solid #a30000", padding:"2px"}}>
                                                        <img
                                                            className="img-subCategory"
                                                            src={product.productImages.length > 0 ?
                                                                "/storage/images/" + product.productImages[0].imagePath : ""}
                                                            alt=""
                                                        />
                                                      </div>

                                                      <a href={`/product?productID=${product.productID}`}
                                                         className="cursor-point hover-underline-animation"
                                                         style={{marginLeft:"15px", fontSize:"17px", fontWeight:"600", color:"#9D9D9D"}}
                                                          // onClick={() => {navigate(`/product?productID=${product.productID}`)}}
                                                      >
                                                        {product.productName}
                                                      </a>
                                                    </div>

                                                    <div style={{display:"flex"}}>
                                                      <div className="pointer-cursor btn-edit-category"
                                                           style={{marginRight:"20px"}}
                                                           onClick={(e) => handleBtnDeleteProductClick(e, product.productID, product.productName)}
                                                      >
                                                        <HiOutlineTrash />
                                                      </div>
                                                      <a
                                                          // href={`/admin/product-management-page/edit-product?productID=${product.productID}`}
                                                      >
                                                        <div className="pointer-cursor btn-edit-category"
                                                             style={{marginRight:"0"}}
                                                             onClick={() => {navigate(`/admin/product-management-page/edit-product?productID=${product.productID}`)}}
                                                        >
                                                          <BiSolidEdit />
                                                        </div>
                                                      </a>

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
          }
        </div>
    );
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
              <p className="category-title">
                DANH MỤC SẢN PHẨM
                <MdLibraryAdd style={{margin:"0 0 8px 8px", fontSize:"27px"}}/>
              </p>
              <div style={{boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.102)", overflow: "hidden", marginBottom:"10px",
                borderRadius:"4px", border:"2px solid #E4E4E4", padding:"0", backgroundColor:"#f9f9f9", height:"75px"}}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", height:"100%", paddingLeft:"35px"}}>
                  <div style={{display:"flex", color:"#333333", fontSize:"18px", fontWeight:"800", marginTop:"7px"}}>
                    <TbListSearch style={{padding:"0px 0 5px", fontSize:"30px", marginRight:"10px"}}/>
                    Tìm kiếm theo:
                    <div style={{paddingTop:"2px"}}>
                      <select className="select-search sort-item" onChange={handleSelectChange}>
                        {/*<option value="">*/}
                        {/*  Chọn điều kiện tìm kiếm*/}
                        {/*</option>*/}
                        <option value={SEARCH.CATEGORY}>
                          Danh mục lớn
                        </option>
                        <option value={SEARCH.SUB_CATEGORY} >
                          Danh mục con
                        </option>
                        <option value={SEARCH.PRODUCT} >
                          Sản phẩm
                        </option>
                      </select>
                    </div>
                  </div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginRight:"35px"}}>
                    <div style={{display:"flex", alignItems:"center", height:"35px", borderBottom:"2px solid #ac0000"}}>
                      <input
                          className="placeholder-color"
                          style={{width:"250px",backgroundColor:"#f9f9f9", border:"none", margin:"0 5px 0 5px"}}
                          type="text"
                          value={searchInputValue}
                          placeholder="Nhập từ khóa"
                          onChange={(e) => setSearchInputValue(e.target.value)}
                      />
                      <IoSearch style={{color:"#ac0000", padding:"0px 0 0px", fontSize:"20px", marginRight:"10px"}}
                                onClick={handleBtnSearchClick}
                                className="pointer-cursor"/>
                    </div>
                  </div>

                </div>
              </div>

              <ListSection />
              {/*{*/}
              {/*  selectedSearch === SEARCH.SUB_CATEGORY ? <SelectedSearchSubCategory /> :*/}
              {/*  (selectedSearch === SEARCH.PRODUCT ? <SelectedSearchProduct /> : <SelectedSearchCategory />)*/}
              {/*}*/}

            </div>
          </div>

        </main>

        {deletedCategory && (
            <div className="modal-overlay">
              <ConfirmDialog title={<span style={{color:"#bd0000"}}>Cảnh báo</span>}
                             subTitle={deletedCategory.type === "category" ?
                                 (
                                     <>
                                       Bạn có chắc chắn xóa danh mục <span style={{color:"#bd0000"}}>{deletedCategory.categoryName}</span> không? <br />
                                       Thao tác này sẽ xóa tất cả danh mục con cùng với sản phẩm thuộc danh mục này.
                                     </>
                                 )
                                 :
                                 (
                                     <>
                                       Bạn có chắc chắn xóa danh mục <span style={{color:"#bd0000"}}>{deletedCategory.categoryName}</span> không? <br />
                                       Thao tác này sẽ xóa tất cả những sản phẩm thuộc danh mục này.
                                     </>
                                 )
                             }
                             titleBtnAccept={"Xóa"}
                             titleBtnCancel={"Hủy bỏ"}
                             onAccept={deleteCategory}
                             onCancel={() => {setDeletedCategory(null)}}/>
            </div>
        )}

        {deletedProduct && (
            <div className="modal-overlay">
              <ConfirmDialog title={<span style={{color:"#bd0000"}}>Cảnh báo</span>}
                             subTitle={ <>
                               Bạn có chắc chắn xóa sản phẩm <span style={{color:"#bd0000"}}>{deletedProduct.productName}</span> không? <br />
                             </>
                             }
                             titleBtnAccept={"Xóa"}
                             titleBtnCancel={"Hủy bỏ"}
                             onAccept={deleteProduct}
                             onCancel={() => {setDeletedProduct(null)}}/>
            </div>
        )}

      </div>
  );
}

export default ProductListPage;