import React, {useEffect, useState} from "react";
import "./style.scss"

import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {HiOutlineTrash, HiPlus} from "react-icons/hi";
import {BiSolidEdit} from "react-icons/bi";
import {TbListSearch} from "react-icons/tb";
import {IoAdd, IoSearch} from "react-icons/io5";
import {MdArrowDropDown, MdArrowRight, MdLibraryAdd} from "react-icons/md";
import {isSubstringIgnoreCaseAndAccents} from '@Utils';
import ConfirmDialog from "@Components/dialogs/ConfirmDialog/ConfirmDialog";
import AddCategoryDialog from "../components/dialogs/AddCategoryDialog/AddCategoryDialog";
import EditCategoryDialog from "../components/dialogs/EditCategoryDialog/EditCategoryDialog";
import {ConfigProvider, Select, Tooltip} from "antd";
import {
  API,
  BREADCRUMB, CATEGORY, CONFIRM_DIALOG,
  LIST_OF_PRODUCTS_AND_CATEGORIES_PAGE,
  MESSAGE, ROOT_PARENT_CATEGORY_ID, SEARCH, SELECT,
  TOOLTIP
} from "@Const";

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
  const [selectedSearch, setSelectedSearch] = useState(SEARCH.PRODUCT_CATEGORY.VALUE.CATEGORY);
  const [productDisplayQuantity, setProductDisplayQuantity] = useState(SELECT.DISPLAY_QUANTITY.VALUE.FIVE);

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
    try {
      const response = await fetch(API.PUBLIC.GET_ALL_CATEGORIES_ENDPOINT, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();

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
              console.error(error);
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

    try {
      const response = await fetch(API.ADMIN.UPLOAD_CATEGORY_IMAGE_ENDPOINT, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.status === 404) {
        toast.error(MESSAGE.DB_CONNECTION_ERROR);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        // console.log('Upload successful:', data);

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
      console.error(error);
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
      // console.log('Đã chọn file:', file);
    }
  };

  const fetchProductDataByCategoryID = async (categoryID) => {
    const apiProductByCategoryID = API.PUBLIC.CATEGORY_ENDPOINT + categoryID;
    try {
      const response = await fetch(apiProductByCategoryID, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("apiProductByCategoryID");
        // console.log(data);
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

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(API.PUBLIC.GET_ALL_PRODUCTS, {
        method: 'GET',
      });

      if (response.status === 200) {
        const data = await response.json();
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

  const fetchProductDataBySearch = async (encodedSearchString) => {
    const decodedSearchString = decodeURIComponent(encodedSearchString).replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();

    if (!decodedSearchString || decodedSearchString == "   ") {
      fetchAllProduct().then(r => {});
      return;
    }
    const apiProductBySearch = API.PUBLIC.SEARCH_ENDPOINT + decodedSearchString;

    try {
      const response = await fetch(apiProductBySearch, {
        method: 'GET',
      });

      if (response.status === 404) {
        toast.error(MESSAGE.DB_CONNECTION_ERROR);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
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
      setSelectedCategoriesID(updatedCategoriesID);
    }
    if (type === CATEGORY.SUB_CATEGORY) {
      fetchProductDataByCategoryID(categoryID).then(r => {});
    }
  }

  const deleteCategory = async () => {
    const formData = new FormData();
    formData.append('categoryID', deletedCategory.categoryID);

    try {
      const response = await fetch(API.ADMIN.DELETE_CATEGORY_ENDPOINT, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.status === 404) {
        toast.error(MESSAGE.DB_CONNECTION_ERROR);
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
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
      console.error(error);
    }
  }

  const deleteProduct = async () => {
    const formData = new FormData();
    formData.append('productID', deletedProduct.productID);

    try {
      const response = await fetch(API.ADMIN.DELETE_PRODUCT_ENDPOINT, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.status === 404) {
        toast.error(MESSAGE.DB_CONNECTION_ERROR);
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
      console.error(error);
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
    setProductDisplayQuantity(SELECT.DISPLAY_QUANTITY.VALUE.FIVE);

    switch (value) {
      case SEARCH.PRODUCT_CATEGORY.VALUE.CATEGORY:
        fetchData().then(r => {});
        break;
      case SEARCH.PRODUCT_CATEGORY.VALUE.SUB_CATEGORY:
        fetchData().then(r => {});
        break;
      case SEARCH.PRODUCT_CATEGORY.VALUE.PRODUCT:
        fetchProductDataBySearch("").then(r => {});
        break;
    }
  };

  const handleSearchInputChange = () => {
    setSelectedCategoriesID([]);
    switch (selectedSearch) {
      case SEARCH.PRODUCT_CATEGORY.VALUE.CATEGORY:
        fetchData().then(r => {
          setCategories((newCategories) =>
              newCategories.filter((category) =>
                  isSubstringIgnoreCaseAndAccents(searchInputValue, category.categoryName)
              )
          );
        });

        break;
      case SEARCH.PRODUCT_CATEGORY.VALUE.SUB_CATEGORY:
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
      case SEARCH.PRODUCT_CATEGORY.VALUE.PRODUCT:
        fetchProductDataBySearch(searchInputValue).then(r => {});
        break;
    }
  };

  useEffect(() => {
    handleSearchInputChange();
  }, [searchInputValue]);

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
                  borderRadius:"3px", border:"1px solid #E4E4E4", padding:"0", backgroundColor:"#FAFAFA"}}>

                  {
                    categories.map((category, index) => (
                        <div key={index}>
                          { selectedSearch !== SEARCH.PRODUCT_CATEGORY.VALUE.SUB_CATEGORY &&
                              <div className={`pointer-cursor ${selectedCategoriesID.find((id) => id === category.categoryID) ? "selected-category-field" : "category-field"}`}
                                   style={{borderTop: `${index !== 0 ? "1px solid #E4E4E4" : "none"}`}}
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

                                  <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>{TOOLTIP.ADD_SUBCATEGORY}</div>} color={"#4A4444"}>
                                    <div className={`${selectedCategoriesID.find((id) => id === category.categoryID) ? "selected-btn-category" : "btn-category"}`}
                                         style={{marginRight:"20px", fontSize:"25px"}}
                                         onClick={(e) => handleBtnAddCategoryClick(e, category.categoryID)}
                                    >
                                      <IoAdd/>
                                    </div>
                                  </Tooltip>

                                  <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>{TOOLTIP.DELETE_CATEGORY}</div>} color={"#4A4444"}>
                                    <div className={`${selectedCategoriesID.find((id) => id === category.categoryID) ? "selected-btn-category" : "btn-category"}`}
                                         style={{marginRight:"20px"}}
                                         onClick={(e) => handleBtnDeleteCategoryClick(e, category.categoryID, category.categoryName, CATEGORY.PARENT_CATEGORY)}
                                    >
                                      <HiOutlineTrash />
                                    </div>
                                  </Tooltip>

                                  <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>{TOOLTIP.EDIT_CATEGORY}</div>} color={"#4A4444"}>
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
                                (selectedCategoriesID.find((id) => id === category.categoryID) || selectedSearch === SEARCH.PRODUCT_CATEGORY.VALUE.SUB_CATEGORY) &&
                                category.subCategories &&
                                category.subCategories.map((subCategory, subCategoryIndex) => (
                                    <div key={subCategoryIndex} style={{borderBottom:`${selectedSearch === SEARCH.PRODUCT_CATEGORY.VALUE.SUB_CATEGORY && "1px solid #E4E4E4"}`}}>
                                      <div className={`${selectedSearch !== SEARCH.PRODUCT_CATEGORY.VALUE.SUB_CATEGORY ? "subCategory-field" : "search-subCategory-field"} pointer-cursor`}
                                           onClick={() => handleCategoryClick(subCategory.categoryID, CATEGORY.SUB_CATEGORY)}
                                      >
                                        <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", width: "100%", height:"100%"}}>

                                          <div style={{alignSelf: "flex-start", width:"25px", minWidth:"25px",
                                            height:`${subCategoryIndex !== category.subCategories.length - 1 ? "100%" : "calc(50% + 1.5px)"}`,
                                            borderRight:`${selectedSearch !== SEARCH.PRODUCT_CATEGORY.VALUE.SUB_CATEGORY ? "3px solid #a30000" : "3px"}`}}/>

                                          <div style={{width:"20px", minWidth:"20px", height:"2.5px", border:"none",
                                            backgroundColor:`${selectedSearch !== SEARCH.PRODUCT_CATEGORY.VALUE.SUB_CATEGORY ? "#a30000" : ""}`}}/>

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
                                                  height:"calc(50% + 1.5px)", borderRight:"3px solid #a30000",
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

                                          <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>{TOOLTIP.ADD_PRODUCT}</div>} color={"#4A4444"}>
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
                                          <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>{TOOLTIP.DELETE_CATEGORY}</div>} color={"#4A4444"}>
                                            <div className="btn-category"
                                                 style={{marginRight:"20px"}}
                                                 onClick={(e) => handleBtnDeleteCategoryClick(e, subCategory.categoryID, subCategory.categoryName, CATEGORY.SUB_CATEGORY)}
                                            >
                                              <HiOutlineTrash />
                                            </div>
                                          </Tooltip>

                                          <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>{TOOLTIP.EDIT_CATEGORY}</div>} color={"#4A4444"}>
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
                                                    <div className={`${selectedSearch !== SEARCH.PRODUCT_CATEGORY.VALUE.SUB_CATEGORY ? "product-field" : "search-product-field"}`}>
                                                      <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", width: "100%", height:"100%"}}>

                                                        <div style={{alignSelf: "flex-start", width:"25px", minWidth:"25px", height:"100%",
                                                          borderRight:`${subCategoryIndex !== category.subCategories.length - 1 && selectedSearch !== SEARCH.PRODUCT_CATEGORY.VALUE.SUB_CATEGORY  ? "3px solid #a30000":"3px"}`}}/>

                                                        <div style={{alignSelf: "flex-start", width:"25px", minWidth:"25px",
                                                          height:`${productIndex !== subCategory.products.length - 1 ? "100%" : "calc(50% + 1.5px)"}`, borderRight:"3px solid #a30000",
                                                          marginLeft:"25px"}}/>

                                                        <div style={{width:"20px", minWidth:"20px", height:"2.5px", backgroundColor:"#a30000", border:"none"}}/>

                                                        <div style={{borderRadius:"100%", border:"3px solid #a30000", padding:"2px"}}>
                                                          <img
                                                              className="img-subCategory"
                                                              src={product.productImages && product.productImages.length > 0 ?
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
                                                        <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>{TOOLTIP.DELETE_PRODUCT}</div>} color={"#4A4444"}>
                                                          <div className="pointer-cursor btn-category"
                                                               style={{marginRight:"20px"}}
                                                               onClick={(e) => handleBtnDeleteProductClick(e, product.productID, product.productName)}
                                                          >
                                                            <HiOutlineTrash />
                                                          </div>
                                                        </Tooltip>

                                                        <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>{TOOLTIP.EDIT_PRODUCT}</div>} color={"#4A4444"}>
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
                                                  <div className={`${selectedSearch !== SEARCH.PRODUCT_CATEGORY.VALUE.SUB_CATEGORY ? "product-field" : "search-product-field"}`}>
                                                    <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", width: "100%", height:"100%"}}>

                                                      <div style={{alignSelf: "flex-start", width:"25px", height:"100%",
                                                        borderRight:`${subCategoryIndex !== category.subCategories.length - 1 && selectedSearch !== SEARCH.PRODUCT_CATEGORY.VALUE.SUB_CATEGORY  ? "3px solid #a30000":"3px"}`}}/>

                                                      <div style={{alignSelf: "flex-start", width:"25px",
                                                        height:"calc(50% + 1.5px)", borderRight:"3px solid #a30000", marginLeft:"25px"}}/>

                                                      <div style={{width:"30px", height:"2.5px", backgroundColor:"#a30000", border:"none"}}/>
                                                      <a style={{cursor: "default", marginLeft:"15px", fontSize:"15", fontWeight:"600", color:"#bd0000"}}>
                                                        {LIST_OF_PRODUCTS_AND_CATEGORIES_PAGE.NO_PRODUCTS}
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
          borderRadius:"3px", border:"1px solid #E4E4E4", padding:"0", backgroundColor:"#FAFAFA"}}>

          <div>
            {
                productsData &&
                productsData.slice(0, productDisplayQuantity).map((product, productIndex) => (
                    <div key={productIndex} style={{borderBottom:"1px solid #E4E4E4"}}>
                      <div className={`${selectedSearch !== SEARCH.PRODUCT_CATEGORY.VALUE.SUB_CATEGORY ? "product-field" : "search-product-field"}`}>
                        <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", width: "100%", height:"100%"}}>
                          <div style={{alignSelf: "flex-start", width:"25px", height:"100%", borderRight:"3px"}}/>

                          <div style={{borderRadius:"100%", border:"3px solid #a30000", padding:"2px"}}>
                            <img
                                className="img-subCategory"
                                src={product.productImages && product.productImages.length > 0 ?
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
                          <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>{TOOLTIP.DELETE_PRODUCT}</div>} color={"#4A4444"}>
                            <div className="pointer-cursor btn-category"
                                 style={{marginRight:"20px"}}
                                 onClick={(e) => handleBtnDeleteProductClick(e, product.productID, product.productName)}
                            >
                              <HiOutlineTrash />
                            </div>
                          </Tooltip>

                          <Tooltip title={<div style={{margin:"5px ", fontWeight:"500"}}>{TOOLTIP.EDIT_PRODUCT}</div>} color={"#4A4444"}>
                            <div className="pointer-cursor btn-category"
                                 style={{marginRight:"0"}}
                                 onClick={() => {navigate(`/admin/management-page/edit-product?productID=${product.productID}`)}}
                            >
                              <BiSolidEdit />
                            </div>
                          </Tooltip>

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
              <a href="/">{BREADCRUMB.HOME_PAGE}</a>
              &gt; <span>{BREADCRUMB.PRODUCT_MANAGEMENT}</span>
              &gt; <span>{BREADCRUMB.PRODUCT_CATEGORY}</span>
            </div>
          </div>

          <div className="container pe-0 ps-0" style={{paddingBottom: "100px", minWidth:"800px"}}>
            <div style={{margin:"0 70px 0 40px"}}>
              <p className="category-title" style={{paddingTop: "30px", display:"flex", justifyContent:"space-between"}}>
                {LIST_OF_PRODUCTS_AND_CATEGORIES_PAGE.PRODUCT_CATEGORY}

                <button type="button" className="add-parent-category-btn"
                        onClick={(e) => handleBtnAddCategoryClick(e, ROOT_PARENT_CATEGORY_ID)}
                >
                  <HiPlus style={{fontSize:"22px", padding:"0 0px 3px 0", marginRight:"4px"}}/>
                  <span style={{marginRight:"5px"}}>{LIST_OF_PRODUCTS_AND_CATEGORIES_PAGE.ADD_PARENT_CATEGORY}</span>
                </button>

              </p>
              <div style={{boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.102)", overflow: "hidden", marginBottom:"10px",
                borderRadius:"3px", border:"1px solid #E4E4E4", padding:"0", backgroundColor:"#FAFAFA", height:"75px"}}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", height:"100%", paddingLeft:"35px"}}>
                  <div style={{display:"flex", color:"#333333", fontSize:"18px", fontWeight:"800", marginTop:"7px", alignItems:"center"}}>
                    <TbListSearch style={{padding:"0 0 2px", fontSize:"28px", marginRight:"10px"}}/>
                    <span>{LIST_OF_PRODUCTS_AND_CATEGORIES_PAGE.SEARCH_BY}</span>
                    <ConfigProvider
                        theme={{
                          components: {
                            Select: {
                              controlItemBgActive: '#ffe6e6',
                              colorTextDescription: '#bd0000',
                            },
                          },
                        }}
                    >
                      <Select
                          defaultValue={SEARCH.PRODUCT_CATEGORY.VALUE.CATEGORY}
                          style={{ width: 170 }}
                          bordered={false}
                          size={"large"}
                          options={[
                            { value: SEARCH.PRODUCT_CATEGORY.VALUE.CATEGORY, label: SEARCH.PRODUCT_CATEGORY.LABEL.CATEGORY },
                            { value: SEARCH.PRODUCT_CATEGORY.VALUE.SUB_CATEGORY, label: SEARCH.PRODUCT_CATEGORY.LABEL.SUB_CATEGORY },
                            { value: SEARCH.PRODUCT_CATEGORY.VALUE.PRODUCT, label: SEARCH.PRODUCT_CATEGORY.LABEL.PRODUCT },
                          ]}
                          onChange={(value) => {handleSelectChange(value)}}
                      />
                    </ConfigProvider>

                  </div>
                  <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginRight:"35px"}}>
                    <div style={{display:"flex", alignItems:"center", height:"35px", borderBottom:"2px solid #ac0000"}}>
                      <input
                          className="placeholder-color"
                          style={{fontSize:"15px", width:"250px",backgroundColor:"#FAFAFA", border:"none", margin:"0 5px 0 5px"}}
                          type="text"
                          value={searchInputValue}
                          placeholder={LIST_OF_PRODUCTS_AND_CATEGORIES_PAGE.SEARCH_KEYWORD_PLACEHOLDER}
                          onChange={(e) => {
                            setSearchInputValue(e.target.value);
                          }}
                      />
                      <IoSearch style={{color:"#ac0000", padding:"0px 0 0px", fontSize:"20px", marginRight:"10px"}}/>
                    </div>
                  </div>

                </div>
              </div>
              {
                selectedSearch === SEARCH.PRODUCT_CATEGORY.VALUE.PRODUCT ?
                    <>
                      <div style={{boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.102)", marginBottom:"10px",
                        borderRadius:"3px", border:"1px solid #E4E4E4", backgroundColor:"#FAFAFA", height:"60px"}}>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"flex-end", height:"100%"}}>
                          <div style={{display:"flex", color:"#333333", fontSize:"15px", fontWeight:"600", alignItems:"center", paddingRight:"25px"}}>
                            <span style={{marginBottom:"1px"}}>{LIST_OF_PRODUCTS_AND_CATEGORIES_PAGE.DISPLAY_QUANTITY}</span>
                            <ConfigProvider
                                theme={{
                                  components: {
                                    Select: {
                                      controlItemBgActive: '#ffe6e6',
                                    },
                                  },
                                }}
                            >
                              <Select
                                  value={productDisplayQuantity}
                                  style={{ width: 68 }}
                                  bordered={false}
                                  size={"small"}
                                  options={[
                                    { value: SELECT.DISPLAY_QUANTITY.VALUE.FIVE, label: SELECT.DISPLAY_QUANTITY.LABEL.FIVE },
                                    { value: SELECT.DISPLAY_QUANTITY.VALUE.TEN, label: SELECT.DISPLAY_QUANTITY.LABEL.TEN },
                                    { value: SELECT.DISPLAY_QUANTITY.VALUE.FIFTY, label: SELECT.DISPLAY_QUANTITY.LABEL.FIFTY },
                                    { value: SELECT.DISPLAY_QUANTITY.VALUE.HUNDRED, label: SELECT.DISPLAY_QUANTITY.LABEL.HUNDRED },
                                    { value: SELECT.DISPLAY_QUANTITY.VALUE.ONE_HUNDRED_FIFTY, label: SELECT.DISPLAY_QUANTITY.LABEL.ONE_HUNDRED_FIFTY },
                                    { value: SELECT.DISPLAY_QUANTITY.VALUE.TWO_HUNDRED, label: SELECT.DISPLAY_QUANTITY.LABEL.TWO_HUNDRED },
                                  ]}
                                  onChange={(value) => setProductDisplayQuantity(value)}
                              />
                            </ConfigProvider>

                          </div>


                        </div>
                      </div>
                      <ListProductSection />
                    </>
                    : <ListCategorySection />
              }
            </div>
          </div>

        </main>

        {deletedCategory && (
            <div className="modal-overlay">
              <ConfirmDialog title={<span style={{color:"#bd0000"}}>{CONFIRM_DIALOG.WARNING_TITLE}</span>}
                             subTitle={deletedCategory.type === CATEGORY.PARENT_CATEGORY ?
                                 (
                                     <>
                                       {CONFIRM_DIALOG.CONFIRM_DELETE_CATEGORY_SUBTITLE_1} <span style={{color:"#bd0000"}}>{deletedCategory.categoryName}</span> {CONFIRM_DIALOG.CONFIRM_DELETE_CATEGORY_SUBTITLE_2} <br />
                                       {CONFIRM_DIALOG.DELETE_PARENT_CATEGORY_WARNING}
                                     </>
                                 )
                                 :
                                 (
                                     <>
                                       {CONFIRM_DIALOG.CONFIRM_DELETE_CATEGORY_SUBTITLE_1} <span style={{color:"#bd0000"}}>{deletedCategory.categoryName}</span> {CONFIRM_DIALOG.CONFIRM_DELETE_CATEGORY_SUBTITLE_2} <br />
                                       {CONFIRM_DIALOG.DELETE_SUB_CATEGORY_WARNING}
                                     </>
                                 )
                             }
                             titleBtnAccept={CONFIRM_DIALOG.DELETE_TITLE_BTN_ACCEPT}
                             titleBtnCancel={CONFIRM_DIALOG.CANCEL_TITLE_BTN_CANCEL}
                             onAccept={deleteCategory}
                             onCancel={() => {setDeletedCategory(null)}}/>
            </div>
        )}

        {deletedProduct && (
            <div className="modal-overlay">
              <ConfirmDialog title={<span style={{color:"#bd0000"}}>{CONFIRM_DIALOG.WARNING_TITLE}</span>}
                             subTitle={ <>
                               {CONFIRM_DIALOG.CONFIRM_DELETE_PRODUCT_SUBTITLE_1} <span style={{color:"#bd0000"}}>{deletedProduct.productName}</span> {CONFIRM_DIALOG.CONFIRM_DELETE_PRODUCT_SUBTITLE_2} <br />
                             </>
                             }
                             titleBtnAccept={CONFIRM_DIALOG.DELETE_TITLE_BTN_ACCEPT}
                             titleBtnCancel={CONFIRM_DIALOG.CANCEL_TITLE_BTN_CANCEL}
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