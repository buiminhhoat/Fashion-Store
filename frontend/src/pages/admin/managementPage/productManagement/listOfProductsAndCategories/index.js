import React, {useEffect, useState} from "react";
import "./style.scss"

import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {HiOutlineTrash} from "react-icons/hi";
import {BiSolidEdit} from "react-icons/bi";
import {TbListSearch} from "react-icons/tb";
import {IoAdd, IoSearch} from "react-icons/io5";
import {MdArrowDropDown, MdArrowRight, MdLibraryAdd} from "react-icons/md";
import {isSubstringIgnoreCaseAndAccents} from "../../../../../utils";
import ConfirmDialog from "../../../../../components/dialogs/ConfirmDialog/ConfirmDialog";
import AddCategoryDialog from "../components/dialogs/AddCategoryDialog/AddCategoryDialog";
import EditCategoryDialog from "../components/dialogs/EditCategoryDialog/EditCategoryDialog";
import {Select, Tooltip} from "antd";
import {CATEGORY, SEARCH, SEARCH_USER} from "../utils/const";
import {MESSAGE} from "../../../../../utils/const";

const ListOfProductsAndCategoriesPage  = () => {
  const navigate = useNavigate();

  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const [deletedCategory, setDeletedCategory] = useState(null);
  const [deletedProduct, setDeletedProduct] = useState(null);

  const [addingCategory, setAddingCategory] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const [selectedCategoriesID, setSelectedCategoriesID] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [categoriesImgID, setCategoriesImgID] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectedSearch, setSelectedSearch] = useState(SEARCH.CATEGORY);

  const  fetchImageAsFile = async (imageUrl, imageName, categoryID) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const newImageFile = new File([blob], imageName, {type: blob.type});
    const newImageURL = URL.createObjectURL(newImageFile);
    return {
      categoryID: categoryID,
      imageFile: newImageFile,
      imageURL: newImageURL
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

        let newData = data.map(category => ({
          ...category,
          subCategories: category.subCategories.map(subCategory => {
            const matchedSubCategory = categories
                .flatMap(cat => cat.subCategories)
                .find(cat => cat.categoryID === subCategory.categoryID);

            return {
              ...subCategory,
              products: matchedSubCategory && matchedSubCategory.products && matchedSubCategory.products.length > 0
                  ? matchedSubCategory.products : subCategory.products,
            };
          }),
        }));

        setCategories(newData);

        const fetchImagePromises = data.flatMap(category =>
            category.subCategories.map(subCategory => {
              const imageUrl = subCategory.imagePath;
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
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  }

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

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
        toast.error(MESSAGE.DB_CONNECTION_ERROR);
        console.error('API endpoint not found:', apiUploadCategoryImageUrl);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        console.log('Upload successful:', data);

        const newCategoriesImgID = categoriesImgID.map(imgID => {
          return (imgID.categoryID === categoryID ? { ...imgID, imageFile: imageFile, imageURL: URL.createObjectURL(imageFile) } : imgID);
        });
        setCategoriesImgID(newCategoriesImgID);
        // fetchData();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
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

  // const fetchRandom12Products = async () => {
  //   const apiGetRandom12Products = "/api/public/all-categories/get-random-12-products";
  //
  //   try {
  //     const response = await fetch(apiGetRandom12Products, {
  //       method: 'GET',
  //     });
  //
  //     if (response.status === 404) {
  //       toast.error(MESSAGE.DB_CONNECTION_ERROR);
  //       console.error('API endpoint not found:', apiGetRandom12Products);
  //       return;
  //     }
  //
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("apiGetRandom12Products");
  //       console.log(data);
  //       setProductsData(data);
  //
  //     } else {
  //       const data = await response.json();
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(MESSAGE.DB_CONNECTION_ERROR);
  //   }
  // }

  const fetchProductDataByCategoryID = async (categoryID) => {
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
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  }

  const fetchProductDataBySearch = async (encodedSearchString) => {
    const decodedSearchString = decodeURIComponent(encodedSearchString);
    // if (decodedSearchString === "") {
    //   fetchRandom12Products().then(r => {});
    //   return;
    // }
    const apiProductBySearch = "/api/public/search/" + decodedSearchString;

    try {
      const response = await fetch(apiProductBySearch, {
        method: 'GET',
      });

      if (response.status === 404) {
        toast.error(MESSAGE.DB_CONNECTION_ERROR);
        console.error('API endpoint not found:', apiProductBySearch);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log("apiProductBySearch");
        console.log(data);
        setProductsData(data);

      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
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
    if (type === CATEGORY.SUB_CATEGORY) {
      fetchProductDataByCategoryID(categoryID).then(r => {});
    }
  }

  const deleteCategory = async () => {
    const formData = new FormData();
    formData.append('categoryID', deletedCategory.categoryID);

    console.log("deletedCategory.categoryID");
    console.log(deletedCategory.categoryID);
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
        toast.error(MESSAGE.DB_CONNECTION_ERROR);
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
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
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
        toast.error(MESSAGE.DB_CONNECTION_ERROR);
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
                products: (subCategory.products ? subCategory.products.filter((product) => product.productID !== deletedProduct.productID) : null)
              })),
            }))
        );

        setProductsData((newProductsData) =>
            productsData.filter((product) => product.productID !== deletedProduct.productID)
        );

        setDeletedProduct(null);
        // fetchData();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
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
  //   // window.open(`/admin/management-page/edit-product?productID=${productID}`, '_blank');
  //   navigate(`/admin/management-page/edit-product?productID=${productID}`);
  // }

  const handleBtnDeleteProductClick = (e, productID, productName) => {
    e.stopPropagation();
    setDeletedProduct({
      productID: productID,
      productName: productName,
    })
  }

  const handleSelectChange = (value) => {
    setSelectedSearch(value);
    setSearchInputValue("");
    setSelectedCategoriesID([]);
    setProductsData([]);
    // fetchRandom12Products().then(r => {});
    fetchData().then(r => {});
  };

  const handleBtnSearchClick = () => {
    setSelectedCategoriesID([]);

    switch (selectedSearch) {
      case SEARCH.CATEGORY:
        fetchData().then(r => {
          setCategories((newCategories) =>
              newCategories.filter((category) =>
                  isSubstringIgnoreCaseAndAccents(searchInputValue, category.categoryName)
              )
          );
        });

        break;
      case SEARCH.SUB_CATEGORY:
        fetchData().then(r => {
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
        fetchProductDataBySearch(searchInputValue).then(r => {});
        break;
    }
  };

  const handleBtnAddCategoryClick = (e, parentCategoryID) => {
    e.stopPropagation();
    setAddingCategory({
      parentCategoryID: parentCategoryID,
    })
  }

  const handleBtnEditCategoryClick = (e, categoryID, categoryName) => {
    e.stopPropagation();
    setEditingCategory({
      categoryID: categoryID,
      categoryName: categoryName,
    })
  }

  const handleAcceptAddCategory = () => {
    fetchData().then(r => {});
    setAddingCategory(null);
  }

  const handleAcceptEditCategory = () => {
    fetchData().then(r => {});
    setEditingCategory(null);
  }

  const ListCategorySection = () => {
    return (
        <div>
          {
              <section>
                <div style={{boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.102)", overflow: "hidden",
                  borderRadius:"4px", border:"2px solid #E4E4E4", padding:"0", backgroundColor:"#FAFAFA"}}>

                  {
                    categories.map((category, index) => (
                        <div key={index}>
                          { selectedSearch !== SEARCH.SUB_CATEGORY &&
                              <div className={`pointer-cursor ${selectedCategoriesID.find((id) => id === category.categoryID) ? "selected-category-field" : "category-field"}`}
                                   style={{borderTop: `${index !== 0 ? "2px solid #E4E4E4" : "none"}`}}
                                   onClick={() => handleCategoryClick(category.categoryID, CATEGORY.PARENT_CATEGORY)}
                              >
                                <div style={{maxWidth:"70%"}}>
                                  <div style={{color:`${selectedCategoriesID.find((id) => id === category.categoryID)?"#E4E4E4":"#9D9D9D"}`,
                                              fontSize:"16px", fontWeight:"600", marginTop:"7px", display:"flex", alignItems:"center", justifyContent:"flex-start"}}>
                                    {
                                      selectedCategoriesID.find((id) => id === category.categoryID) ?
                                          <MdArrowDropDown style={{padding:"0px 0 5px", fontSize:"37px", marginRight:"10px"}}/>
                                          :
                                          <MdArrowRight style={{padding:"0px 0 5px", fontSize:"37px", marginRight:"10px"}}/>
                                    }
                                    <a className="hover-underline-animation"
                                       href={`/category?categoryID=${category.categoryID}`}
                                       style={{color:`${selectedCategoriesID.find((id) => id === category.categoryID)?"#E4E4E4":"#9D9D9D"}`}}
                                    >
                                      {category.categoryName}
                                    </a>

                                  </div>

                                </div>
                                <div style={{display:"flex"}}>

                                  <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>Thêm danh mục con</div>} color={"#4A4444"}>
                                    <div className={`${selectedCategoriesID.find((id) => id === category.categoryID) ? "selected-btn-category" : "btn-category"}`}
                                         style={{marginRight:"20px", fontSize:"25px"}}
                                         onClick={(e) => handleBtnAddCategoryClick(e, category.categoryID)}
                                    >
                                      <IoAdd/>
                                    </div>
                                  </Tooltip>

                                  <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>Xóa danh mục</div>} color={"#4A4444"}>
                                    <div className={`${selectedCategoriesID.find((id) => id === category.categoryID) ? "selected-btn-category" : "btn-category"}`}
                                         style={{marginRight:"20px"}}
                                         onClick={(e) => handleBtnDeleteCategoryClick(e, category.categoryID, category.categoryName, CATEGORY.PARENT_CATEGORY)}
                                    >
                                      <HiOutlineTrash />
                                    </div>
                                  </Tooltip>

                                  <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>Chỉnh sửa danh mục</div>} color={"#4A4444"}>
                                    <div className={`${selectedCategoriesID.find((id) => id === category.categoryID) ? "selected-btn-category" : "btn-category"}`}
                                         style={{marginRight:"0"}}
                                         onClick={(e) => handleBtnEditCategoryClick(e, category.categoryID, category.categoryName)}
                                    >
                                      <BiSolidEdit />
                                    </div>
                                  </Tooltip>

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
                                           onClick={() => handleCategoryClick(subCategory.categoryID, CATEGORY.SUB_CATEGORY)}
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
                                                      categoriesImgID.find((imgID) => imgID.categoryID === subCategory.categoryID).imageURL : ""}
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
                                                // subCategory.products &&
                                                // subCategory.products.length > 0 &&
                                                <div style={{position:"absolute", zIndex:"0", alignSelf: "flex-end", width:"5px",
                                                  height:"51%", borderRight:"3px solid #a30000",
                                                  marginLeft:"25px"}}/>
                                            }
                                          </div>

                                          <a className="hover-underline-animation"
                                             href={`/category?categoryID=${subCategory.categoryID}`}
                                             style={{marginLeft:"15px", fontSize:"15px", fontWeight:"600", color:"#9D9D9D"}}
                                          >
                                            {subCategory.categoryName}
                                          </a>
                                        </div>

                                        <div style={{display:"flex"}}>

                                          <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>Thêm sản phẩm</div>} color={"#4A4444"}>
                                            <div className="btn-category"
                                                 style={{marginRight:"20px", fontSize:"25px"}}
                                                 onClick={() => {
                                                   navigate(`/admin/management-page/add-product`, {
                                                     state: { category: category, subCategory: subCategory  },
                                                   });
                                                 }}
                                            >
                                              <IoAdd/>
                                            </div>
                                          </Tooltip>
                                          <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>Xóa danh mục</div>} color={"#4A4444"}>
                                            <div className="btn-category"
                                                 style={{marginRight:"20px"}}
                                                 onClick={(e) => handleBtnDeleteCategoryClick(e, subCategory.categoryID, subCategory.categoryName, CATEGORY.SUB_CATEGORY)}
                                            >
                                              <HiOutlineTrash />
                                            </div>
                                          </Tooltip>

                                          <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>Chỉnh sửa danh mục</div>} color={"#4A4444"}>
                                            <div className="btn-category"
                                                 style={{marginRight:"0"}}
                                                 onClick={(e) => handleBtnEditCategoryClick(e, subCategory.categoryID, subCategory.categoryName)}
                                            >
                                              <BiSolidEdit />
                                            </div>
                                          </Tooltip>
                                        </div>

                                      </div>

                                      <div>
                                        {
                                          selectedCategoriesID.find((id) => id === subCategory.categoryID) &&
                                          (
                                            subCategory.products && subCategory.products.length > 0 ?
                                            (
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
                                                                  product.productImages[0].imagePath : ""}
                                                              alt=""
                                                          />
                                                        </div>

                                                        <a href={`/product?productID=${product.productID}`}
                                                           className="cursor-point hover-underline-animation"
                                                           style={{marginLeft:"15px", fontSize:"15", fontWeight:"600", color:"#9D9D9D"}}
                                                            // onClick={() => {navigate(`/product?productID=${product.productID}`)}}
                                                        >
                                                          {product.productName}
                                                        </a>
                                                      </div>

                                                      <div style={{display:"flex"}}>
                                                        <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>Xóa sản phẩm</div>} color={"#4A4444"}>
                                                          <div className="pointer-cursor btn-category"
                                                               style={{marginRight:"20px"}}
                                                               onClick={(e) => handleBtnDeleteProductClick(e, product.productID, product.productName)}
                                                          >
                                                            <HiOutlineTrash />
                                                          </div>
                                                        </Tooltip>

                                                        <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>Chỉnh sửa sản phẩm</div>} color={"#4A4444"}>
                                                          <a>
                                                            <div className="pointer-cursor btn-category"
                                                                 style={{marginRight:"0"}}
                                                                 onClick={() => {navigate(`/admin/management-page/edit-product?productID=${product.productID}`)}}
                                                            >
                                                              <BiSolidEdit />
                                                            </div>
                                                          </a>
                                                        </Tooltip>

                                                      </div>

                                                    </div>
                                                  </div>
                                              ))
                                            )
                                            :
                                            (
                                                <div>
                                                  <div className={`${selectedSearch !== SEARCH.SUB_CATEGORY ? "product-field" : "search-product-field"}`}>
                                                    <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", width: "100%", height:"100%"}}>

                                                      <div style={{alignSelf: "flex-start", width:"25px", height:"100%",
                                                        borderRight:`${subCategoryIndex !== category.subCategories.length - 1 && selectedSearch !== SEARCH.SUB_CATEGORY  ? "3px solid #a30000":"3px"}`}}/>

                                                      <div style={{alignSelf: "flex-start", width:"25px",
                                                        height:"51%", borderRight:"3px solid #a30000", marginLeft:"25px"}}/>

                                                      <div style={{width:"30px", height:"2.5px", backgroundColor:"#a30000", border:"none"}}/>
                                                      <a style={{cursor: "default", marginLeft:"15px", fontSize:"15", fontWeight:"600", color:"#bd0000"}}>
                                                        Không có sản phẩm
                                                      </a>
                                                    </div>
                                                  </div>
                                                </div>
                                            )
                                          )

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

  const ListProductSection = () => {
    return (
      <section>
        <div style={{boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.102)", overflow: "hidden",
          borderRadius:"4px", border:"2px solid #E4E4E4", padding:"0", backgroundColor:"#FAFAFA"}}>

          <div>
            {
                productsData &&
                productsData.map((product, productIndex) => (
                    <div key={productIndex}>
                      <div className={`${selectedSearch !== SEARCH.SUB_CATEGORY ? "product-field" : "search-product-field"}`}>
                        <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", width: "100%", height:"100%"}}>
                          <div style={{alignSelf: "flex-start", width:"25px", height:"100%", borderRight:"3px"}}/>

                          <div style={{borderRadius:"100%", border:"3px solid #a30000", padding:"2px"}}>
                            <img
                                className="img-subCategory"
                                src={product.productImages.length > 0 ?
                                    product.productImages[0].imagePath : ""}
                                alt=""
                            />
                          </div>

                          <a href={`/product?productID=${product.productID}`}
                             className="cursor-point hover-underline-animation"
                             style={{marginLeft:"15px", fontSize:"15px", fontWeight:"600", color:"#9D9D9D"}}
                              // onClick={() => {navigate(`/product?productID=${product.productID}`)}}
                          >
                            {product.productName}
                          </a>
                        </div>

                        <div style={{display:"flex"}}>
                          <div className="pointer-cursor btn-category"
                               style={{marginRight:"20px"}}
                               onClick={(e) => handleBtnDeleteProductClick(e, product.productID, product.productName)}
                          >
                            <HiOutlineTrash />
                          </div>
                          <a
                              // href={`/admin/management-page/edit-product?productID=${product.productID}`}
                          >
                            <div className="pointer-cursor btn-category"
                                 style={{marginRight:"0"}}
                                 onClick={() => {navigate(`/admin/management-page/edit-product?productID=${product.productID}`)}}
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
      </section>
    );
  }

  return (
      <div id="app">
        <main id="main">
          <div className="container profile-wrap">
            <div className="breadcrumb-wrap">
              <a href="/">Trang chủ</a>
              &gt; <span>Quản lý sản phẩm</span>
              &gt; <span>Danh mục và sản phẩm</span>
            </div>
          </div>

          <div className="container pe-0 ps-0" style={{paddingBottom: "100px"}}>
            <div style={{margin:"0 70px 0 40px"}}>
              <p className="category-title" style={{paddingTop: "30px"}}>
                DANH MỤC SẢN PHẨM

                <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>Thêm danh mục lớn</div>} color={"#4A4444"}>
                  <MdLibraryAdd className="pointer-cursor"
                                style={{margin:"0 0 8px 8px", fontSize:"27px"}}
                                onClick={(e) => handleBtnAddCategoryClick(e, 0)}
                  />
                </Tooltip>

              </p>
              <div style={{boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.102)", overflow: "hidden", marginBottom:"10px",
                borderRadius:"4px", border:"2px solid #E4E4E4", padding:"0", backgroundColor:"#FAFAFA", height:"75px"}}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", height:"100%", paddingLeft:"35px"}}>
                  <div style={{display:"flex", color:"#333333", fontSize:"18px", fontWeight:"800", marginTop:"7px", alignItems:"center"}}>
                    <TbListSearch style={{padding:"0 0 2px", fontSize:"28px", marginRight:"10px"}}/>
                    <span>Tìm kiếm theo:</span>
                    <Select
                        defaultValue={SEARCH.CATEGORY}
                        style={{ width: 170 }}
                        bordered={false}
                        size={"large"}
                        options={[
                          { value: SEARCH.CATEGORY, label: 'Danh mục lớn' },
                          { value: SEARCH.SUB_CATEGORY, label: 'Danh mục con' },
                          { value: SEARCH.PRODUCT, label: 'Sản phẩm' },
                        ]}
                        onChange={(value) => {handleSelectChange(value)}}
                    />
                  </div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginRight:"35px"}}>
                    <div style={{display:"flex", alignItems:"center", height:"35px", borderBottom:"2px solid #ac0000"}}>
                      <input
                          className="placeholder-color"
                          style={{fontSize:"15px", width:"250px",backgroundColor:"#FAFAFA", border:"none", margin:"0 5px 0 5px"}}
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

              {
                selectedSearch === SEARCH.PRODUCT ? <ListProductSection /> : <ListCategorySection />
              }

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
                             subTitle={deletedCategory.type === CATEGORY.PARENT_CATEGORY ?
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

        {addingCategory && (
            <div className="modal-overlay">
              <AddCategoryDialog parentCategoryID={addingCategory.parentCategoryID}
                                 onAccept={handleAcceptAddCategory}
                                 onClose={() => {setAddingCategory(null)}}/>
            </div>
        )}

        {editingCategory && (
            <div className="modal-overlay">
              <EditCategoryDialog categoryID={editingCategory.categoryID}
                                  categoryName={editingCategory.categoryName}
                                  onAccept={handleAcceptEditCategory}
                                  onClose={() => {setEditingCategory(null)}}/>
            </div>
        )}

      </div>
  );
}

export default ListOfProductsAndCategoriesPage;