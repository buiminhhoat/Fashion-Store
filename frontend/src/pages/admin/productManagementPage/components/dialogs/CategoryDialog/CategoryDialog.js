import { useEffect, useRef, useState} from "react";
import "./style.scss";
import {HiOutlineTrash, HiPlus} from 'react-icons/hi';
import {BsCheckLg} from 'react-icons/bs';
import {MdOutlineClose} from "react-icons/md";
import {toast} from "react-toastify";
import {useCookies} from "react-cookie";
import {FiEdit3} from "react-icons/fi";
import {ConfigProvider, Popconfirm} from "antd";
import {startsWithLetter} from "../../../../../../utils";

const CATEGORY = {
  SUB_CATEGORY: "SUB_CATEGORY",
  PARENT_CATEGORY: "PARENT_CATEGORY",
}

const CategoryDialog = ({ onClose, onConfirm }) => {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const [inputCategoryValue, setInputCategoryValue] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [categories, setCategories] = useState([]);

  const [inputSubCategoryValue, setInputSubCategoryValue] = useState('');
  const [isAddingSubCategory, setIsAddingSubCategory] = useState(false);

  const [selectedParentCategory, setSelectedParentCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});

  const [editingCategoryID, setEditingCategoryID] = useState(null);

  const inputCategoryRef = useRef(null);
  const inputSubCategoryRef = useRef(null);

  const handleButtonCloseClick = () => {
    onClose();
  };

  const handleSubmitCategoryDialog = () => {
    onConfirm(selectedCategory, selectedParentCategory);
  };

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
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Không thể kết nối được với database");
    }
  }

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

  useEffect(() => {
    if (isAddingCategory && inputCategoryRef) {
      inputCategoryRef.current.focus();
    }
  }, [isAddingCategory]);

  useEffect(() => {
    if (editingCategoryID && inputCategoryRef) {
      inputCategoryRef.current.focus();
    }
  }, [editingCategoryID]);

  useEffect(() => {
    if (isAddingSubCategory && inputSubCategoryRef) {
      inputSubCategoryRef.current.focus();
    }
  }, [isAddingSubCategory]);

  const getSubCategoriesByParentCategoryID = (categoryID) => {
    const selectedCategory = categories.find((category) => category.categoryID === categoryID);
    return selectedCategory ? (selectedCategory.subCategories ? selectedCategory.subCategories : []) : [];
  };

  const handleCategoryClick = (category) => {
    handleCancelCategoryClick();
    handleCancelSubCategoryClick();
    setSelectedCategory({});
    setSelectedParentCategory(category);
  };

  const handleSubCategoryClick = (subCategory) => {
    handleCancelCategoryClick();
    handleCancelSubCategoryClick();
    setSelectedCategory(subCategory);
  };

  // handle category
  const handleAddCategoryClick = () => {
    setSelectedCategory({});
    setSelectedParentCategory({});
    handleCancelSubCategoryClick();
    setIsAddingCategory(true);
  };

  const handleSaveCategory = async () => {
    if (inputCategoryValue === "") {
      toast.warn("Tên danh mục không được để trống");
      return;
    }
    if (!startsWithLetter(inputCategoryValue)) {
      toast.warn("Tên danh mục phải bắt đầu bằng một chữ cái");
      return;
    }

    let parentCategoryID = 0;
    const formData = new FormData();
    formData.append('categoryName', inputCategoryValue);
    formData.append('parentCategoryID', parentCategoryID);

    const apiAddCategoryUrl = "/api/admin/add-category";
    try {
      const response = await fetch(apiAddCategoryUrl, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);

        // if (inputCategoryValue !== "") {
        //   setCategories([...categories, { id: 0, name: inputCategoryValue }]);
        // }

        setInputCategoryValue("");
        setIsAddingCategory(false);
        fetchData().then(r => {});
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Không thể kết nối được với database");
    }
  };

  const handleSaveSubCategory = async () => {
    // if (inputCategoryValue === "") {
    //   toast.warn("Tên danh mục không được để trống");
    //   return;
    // }
    // if (!startsWithLetter(inputCategoryValue)) {
    //   toast.warn("Tên danh mục phải bắt đầu bằng một chữ cái");
    //   return;
    // }

    let parentCategoryID = selectedParentCategory.categoryID;
    let categoryName = inputSubCategoryValue;

    const formData = new FormData();
    formData.append('parentCategoryID', parentCategoryID);
    formData.append('categoryName', categoryName);

    const apiAddCategoryUrl = "/api/admin/add-category";
    try {
      const response = await fetch(apiAddCategoryUrl, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);

        // if (inputCategoryValue !== "") {
        //   setCategories([...categories, { id: 0, name: inputCategoryValue }]);
        // }

        handleCancelCategoryClick();
        fetchData().then(r => {});
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Không thể kết nối được với database");
    }
  };

  const handleSaveCategoryClick = () => {
    handleSaveCategory().then(r => {});
  };

  const deleteCategory = async (categoryID, type) => {
    const formData = new FormData();
    formData.append('categoryID', categoryID);

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

        if (type === CATEGORY.PARENT_CATEGORY) {
          setSelectedParentCategory({});
          setSelectedCategory({});
        }
        if (type === CATEGORY.SUB_CATEGORY) {
          setSelectedCategory({});
        }

        fetchData().then(r => {});
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Không thể kết nối được với database");
      console.error('Failed:', error);
    }
  }

  const handleDeleteCategoryClick = (categoryID, type) => {
    deleteCategory(categoryID, type).then(r => {})
  }

  const editCategory = async (categoryID, categoryName) => {
    if (inputCategoryValue === "") {
      toast.warn("Tên danh mục không được để trống");
      return;
    }
    if (!startsWithLetter(inputCategoryValue)) {
      toast.warn("Tên danh mục phải bắt đầu bằng một chữ cái");
      return;
    }

    const formData = new FormData();
    formData.append('categoryID', categoryID);
    formData.append('categoryName', categoryName);

    let apiEditCategoryUrl = "/api/admin/edit-category";
    try {
      const response = await fetch(apiEditCategoryUrl, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.status === 404) {
        toast.error("Không thể kết nối được với database");
        console.error('API endpoint not found:', apiEditCategoryUrl);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        fetchData().then(r => { setEditingCategoryID(null) });
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Không thể kết nối được với database");
      console.error('Failed:', error);
    }
  }

  const handleSaveEditCategoryClick = (categoryID) => {
    editCategory(categoryID, inputCategoryValue).then(r => {});
  }

  const handleEditCategoryClick = (e, categoryID, categoryName) => {
    e.stopPropagation();
    setInputCategoryValue(categoryName);
    setEditingCategoryID(categoryID);
  }

  // handle subCategory
  const handleAddSubCategoryClick = () => {
    setIsAddingSubCategory(true);
  };

  const handleSaveSubCategoryClick = () => {
    if (inputSubCategoryValue !== "") {
      handleSaveSubCategory().then(r => {});
      // addSubCategory({ id: 0, name: inputSubCategoryValue});
    }
    handleCancelSubCategoryClick();
  };

  const handleCancelSubCategoryClick = (e) => {
    if (e) e.stopPropagation();
    setInputSubCategoryValue("");
    setIsAddingSubCategory(false);
  };

  const handleCancelCategoryClick = (e) => {
    if (e) e.stopPropagation();
    setInputCategoryValue("");
    setIsAddingCategory(false);
    setEditingCategoryID(null);
  };

  // const addSubCategory = (newSubCategory) => {
  //   const newCategories = [...categories];
  //   const parentCategory = newCategories.find(category => category.categoryID === selectedCategory.ID);
  //
  //   if (parentCategory) {
  //     if (!parentCategory.subCategories) {
  //       parentCategory.subCategories = [];
  //     }
  //     parentCategory.subCategories.push(newSubCategory);
  //
  //     setCategories(newCategories);
  //   }
  // };

  return (
    <div className="modal" id="modal-auth" style={{ display: 'flex', alignItems:"center", justifyContent:"center" }}>
      <div className="fashion-store-modal__content fashion-store-modal__content--normal" style={{width:"700px"}}>
        <div className="fashion-store-modal__header" style={{position: "relative"}}>

          <div className="btn-close category-dialog-btn-close pointer-cursor"
               aria-label="Close"
               onClick={handleButtonCloseClick}
          />

          <div className="fashion-store-modal__header-inner fashion-store-modal__header-inner__has-close">
            <div className="fashion-store-modal__title">Chỉnh sửa danh mục</div>
          </div>
        </div>

        <div className="fashion-store-modal__body over-height" style={{position: "relative"}}>
          <div data-v-59dc2242="" className="category-selector-wrap">
            <div data-v-38ab3376="" data-v-59dc2242="" className="category-selector category-selector">
              <div data-v-38ab3376="" className="selector" style={{marginBottom:"30px", paddingTop:"2px"}}>
                <div data-v-38ab3376="" className="category-wrap">
                  <div data-v-38ab3376="" className="category-list">

                    <ul data-v-38ab3376="" className="scroll-item" style={{paddingLeft:"5px"}}>

                      {isAddingCategory ?
                          <li data-v-38ab3376="" className="category-item" style={{background:"white"}}>
                            <div data-v-38ab3376="" className="text-overflow">
                              <input className="input-category"
                                     type="text" ref={inputCategoryRef}
                                     value={inputCategoryValue}
                                     onChange={(e) => setInputCategoryValue(e.target.value)}
                              />
                            </div>
                            <div data-v-38ab3376="" className="category-item-right">
                              <MdOutlineClose onClick={(e) => handleCancelCategoryClick(e)} className="btn-add pointer-cursor" style={{marginRight:"5px"}}/>
                              <BsCheckLg onClick={handleSaveCategoryClick} className="btn-add pointer-cursor"/>
                            </div>
                          </li>
                          :
                          <li data-v-38ab3376="" className="category-item" onClick={handleAddCategoryClick}>
                            <div data-v-38ab3376="" className="text-overflow">
                              <HiPlus className="btn-add pointer-cursor" style={{marginBottom:"4px", marginRight:"5px"}}/> Thêm danh mục
                            </div>
                          </li>
                      }

                      {categories && categories.map((category, index) => (
                        <>
                          {editingCategoryID && category.categoryID === editingCategoryID ?
                            <li key={index} data-v-38ab3376="" className="category-item" style={{background:"white"}}>
                              <div data-v-38ab3376="" className="text-overflow">
                                <input className="input-category"
                                       style={{borderBottom: "1px solid #bd0000"}}
                                       type="text" ref={inputCategoryRef}
                                       value={inputCategoryValue}
                                       onChange={(e) => setInputCategoryValue(e.target.value)}
                                />
                              </div>
                              <div data-v-38ab3376="" className="category-item-right">
                                <MdOutlineClose onClick={(e) => handleCancelCategoryClick(e)} className="btn-add pointer-cursor" style={{marginRight:"5px", color:"#bd0000"}}/>
                                <BsCheckLg onClick={() => handleSaveEditCategoryClick(category.categoryID)} className="btn-add pointer-cursor"  style={{color:"#bd0000"}}/>
                              </div>
                            </li>
                            :
                            <li data-v-38ab3376="" key={index} className="category-item" onClick={() => handleCategoryClick(category)}>
                              <p data-v-38ab3376="" className={`text-overflow ${category.categoryID === selectedParentCategory.categoryID ? 'selected-category' : ''}`}>
                                {category.categoryName}
                              </p>

                              { category.categoryID === selectedParentCategory.categoryID ?
                                  <div data-v-38ab3376="" className="category-item-right">
                                    <FiEdit3  onClick={(e) => handleEditCategoryClick(e, category.categoryID, category.categoryName)}
                                              className="selected-category btn-add pointer-cursor"
                                              style={{marginRight:"6px"}}
                                    />

                                    <ConfigProvider
                                        button={{
                                          style: { width: 80, margin: 4 },
                                        }}
                                    >
                                      <Popconfirm
                                          placement="top"
                                          title={'Bạn có chắc chắn xóa danh mục này không? '}
                                          description={<div>Thao tác này sẽ xóa tất cả danh mục con <br></br>  cùng với sản phẩm thuộc danh mục này.</div>}
                                          okText={<div>Xóa</div>}
                                          cancelText={<div>Hủy</div>}
                                          onConfirm={() => handleDeleteCategoryClick(category.categoryID, CATEGORY.PARENT_CATEGORY)}
                                      >
                                        <HiOutlineTrash className="selected-category btn-delete pointer-cursor"/>
                                      </Popconfirm>
                                    </ConfigProvider>
                                  </div>
                                  :
                                  <div data-v-38ab3376="" className="category-item-right">
                                    <i data-v-38ab3376="" className="icon-next fashion-store-icon">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                        <path d="M23.5 15.5l-12-11c-.6-.6-1.5-.6-2.1 0-.2.2-.4.6-.4 1s.2.8.4 1l10.9 10-10.9 10c-.6.6-.6 1.5 0 2.1.3.3.7.4 1 .4.4 0 .7-.1 1-.4l11.9-10.9.1-.1c.3-.3.4-.7.4-1.1.1-.4 0-.8-.3-1z"></path>
                                      </svg>
                                    </i>
                                  </div>
                              }
                            </li>
                          }
                        </>
                      ))}
                    </ul>




                    <ul data-v-38ab3376="" className="scroll-item" style={{paddingLeft:"6px"}}>
                      { selectedParentCategory.categoryName &&
                          <div>
                            {isAddingSubCategory ?
                                <li data-v-38ab3376="" className="category-item" style={{background:"white"}}>
                                  <div data-v-38ab3376="" className="text-overflow">
                                    <input className="input-category" type="text" ref={inputSubCategoryRef}
                                           onChange={(e) => setInputSubCategoryValue(e.target.value)}/>
                                  </div>
                                  <div data-v-38ab3376="" className="category-item-right">
                                    <MdOutlineClose onClick={(e) => handleCancelSubCategoryClick(e)} className="btn-add pointer-cursor" style={{marginRight:"5px"}}/>
                                    <BsCheckLg onClick={handleSaveSubCategoryClick} className="btn-add pointer-cursor"/>
                                  </div>
                                </li>
                                :
                                <li data-v-38ab3376="" className="category-item" onClick={handleAddSubCategoryClick}>
                                  <div data-v-38ab3376="" className="text-overflow">
                                    <HiPlus className="btn-add pointer-cursor" style={{marginBottom:"4px", marginRight:"5px"}}/> Thêm danh mục
                                  </div>
                                </li>
                            }
                          </div>
                      }

                      {
                        getSubCategoriesByParentCategoryID(selectedParentCategory.categoryID).map((subCategory, index) => (
                            <li data-v-38ab3376="" className="category-item" key={index}
                                onClick={() => handleSubCategoryClick(subCategory)}>
                              <p data-v-38ab3376="" className={`text-overflow ${subCategory.categoryID === selectedCategory.categoryID ? 'selected-category' : ''}`}>
                                {subCategory.categoryName}
                              </p>
                              { subCategory.categoryID === selectedCategory.categoryID &&
                                  <div data-v-38ab3376="" className="category-item-right">
                                    <FiEdit3  onClick={handleSaveCategoryClick} className="selected-category btn-add pointer-cursor" style={{marginRight:"6px"}}/>

                                    <ConfigProvider
                                        button={{
                                          style: { width: 80, margin: 4 },
                                        }}
                                    >
                                      <Popconfirm
                                          placement="top"
                                          title={'Bạn có chắc chắn xóa danh mục này không? '}
                                          description={<div>Thao tác này sẽ xóa tất cả những sản phẩm<br></br> thuộc danh mục này.</div>}
                                          okText={<div>Xóa</div>}
                                          cancelText={<div>Hủy</div>}
                                          onConfirm={() => handleDeleteCategoryClick(subCategory.categoryID, CATEGORY.SUB_CATEGORY)}
                                      >
                                        <HiOutlineTrash className="selected-category btn-delete pointer-cursor"/>
                                      </Popconfirm>
                                    </ConfigProvider>

                                  </div>
                              }
                            </li>
                        ))
                      }
                    </ul>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fashion-store-modal__footer with-assist">
          <div data-v-59dc2242="" className="category-selected" style={{display:"flex"}}>
            <span data-v-59dc2242="" className="label" style={{fontSize:"14px", marginRight: "5px"}}>Đã chọn: </span>

            {selectedParentCategory.categoryName ?
              <span style={{fontSize:"14px", marginRight: "5px"}} >
                {selectedParentCategory.categoryName}
                {selectedCategory.categoryName && (" > " + selectedCategory.categoryName) }
              </span>
              :
              <span style={{fontSize:"14px", marginRight: "5px"}} >Chưa chọn ngành hàng</span>
            }

          </div>

          <div className="fashion-store-modal__footer-buttons">
            <button type="button"
                    className="fashion-store-button fashion-store-button--normal"
                    onClick={handleButtonCloseClick}>
              <span>Hủy</span>
            </button>

            {selectedCategory.categoryName && selectedParentCategory.categoryName ?
                <button type="button"
                        onClick={handleSubmitCategoryDialog}
                        className="fashion-store-button fashion-store-button--primary fashion-store-button--normal">
                  <span>Xác nhận</span>
                </button>
                :
                <button type="button" disabled="disabled"
                        className="fashion-store-button fashion-store-button--primary fashion-store-button--normal disabled">
                  <span>Xác nhận</span>
                </button>
            }

          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryDialog;
