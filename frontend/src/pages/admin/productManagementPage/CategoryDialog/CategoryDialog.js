import { useEffect, useRef, useState} from "react";
import "./style.scss";
import {HiPlus} from 'react-icons/hi';
import {BsCheckLg} from 'react-icons/bs';
import {MdOutlineClose} from "react-icons/md";
import {toast} from "react-toastify";

const CategoryDialog = ({ onClose, onConfirm }) => {
  const [inputCategoryValue, setInputCategoryValue] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [categories, setCategories] = useState([]);

  const [inputSubcategoryValue, setInputSubcategoryValue] = useState('');
  const [isAddingSubcategory, setIsAddingSubcategory] = useState(false);

  const [selectedParentCategory, setSelectedParentCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});


  const inputCategoryRef = useRef(null);
  const inputSubcategoryRef = useRef(null);

  const apiGetCategory = "http://localhost:9999/api/get-all-categories";

  const handleButtonCloseClick = () => {
    onClose();
  };

  const handleSubmitCategoryDialog = () => {
    onConfirm(selectedCategory, selectedParentCategory);
  };

  const fetchData = async () => {
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

  useEffect(() => {
    if (isAddingCategory && inputCategoryRef) {
      inputCategoryRef.current.focus();
    }
  }, [isAddingCategory]);

  useEffect(() => {
    if (isAddingSubcategory && inputSubcategoryRef) {
      inputSubcategoryRef.current.focus();
    }
  }, [isAddingSubcategory]);

  const getSubcategoriesByParentCategoryID = (categoryID) => {
    const selectedCategory = categories.find((category) => category.categoryID === categoryID);
    return selectedCategory ? (selectedCategory.subcategories ? selectedCategory.subcategories : []) : [];
  };

  const handleCategoryClick = (category) => {
    handleCancelCategoryClick();
    handleCancelSubcategoryClick();
    setSelectedCategory({});
    setSelectedParentCategory(category);
  };

  const handleSubcategoryClick = (subcategory) => {
    handleCancelCategoryClick();
    handleCancelSubcategoryClick();
    setSelectedCategory(subcategory);
  };

  // handle category
  const handleAddCategoryClick = () => {
    setSelectedCategory({});
    setSelectedParentCategory({});
    handleCancelSubcategoryClick();
    setIsAddingCategory(true);
  };

  const apiAddCategoryUrl = "http://localhost:9999/api/add-category";

  const handleSaveCategory = async () => {
    let parentCategoryID = 0;
    const formData = new FormData();
    formData.append('categoryName', inputCategoryValue);
    formData.append('parentCategoryID', parentCategoryID);
    try {
      const response = await fetch(apiAddCategoryUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);

        if (inputCategoryValue !== "") {
          setCategories([...categories, { id: 0, name: inputCategoryValue }]);
        }

        setInputCategoryValue("");
        setIsAddingCategory(false);
        fetchData();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Không kết nối được với database");
    }
  };

  const handleSaveSubCategory = async () => {
    let parentCategoryID = selectedParentCategory.categoryID;
    let categoryName = inputSubcategoryValue;

    const formData = new FormData();
    formData.append('parentCategoryID', parentCategoryID);
    formData.append('categoryName', categoryName);

    try {
      const response = await fetch(apiAddCategoryUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);

        if (inputCategoryValue !== "") {
          setCategories([...categories, { id: 0, name: inputCategoryValue }]);
        }

        setInputCategoryValue("");
        setIsAddingCategory(false);
        fetchData();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Không kết nối được với database");
    }
  };

  const handleSaveCategoryClick = () => {
    handleSaveCategory().then(r => {

    });
  };

  const handleCancelCategoryClick = () => {
    setInputCategoryValue("");
    setIsAddingCategory(false);
  };

  // handle subcategory
  const handleAddSubcategoryClick = () => {
    setIsAddingSubcategory(true);
  };

  const handleSaveSubcategoryClick = () => {
    if (inputSubcategoryValue !== "") {
      handleSaveSubCategory();
      addSubcategory({ id: 0, name: inputSubcategoryValue});
    }
    setInputSubcategoryValue("");
    setIsAddingSubcategory(false);
  };

  const handleCancelSubcategoryClick = () => {
    setInputSubcategoryValue("");
    setIsAddingSubcategory(false);
  };

  const addSubcategory = (newSubcategory) => {
    const newCategories = [...categories];
    const parentCategory = newCategories.find(category => category.categoryID === selectedCategory.ID);

    if (parentCategory) {
      if (!parentCategory.subcategories) {
        parentCategory.subcategories = [];
      }
      parentCategory.subcategories.push(newSubcategory);

      setCategories(newCategories);
    }
  };

  return (
      <div>
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
                                <input className="input-category" type="text" ref={inputCategoryRef}
                                       onChange={(e) => setInputCategoryValue(e.target.value)}/>
                              </div>
                              <div data-v-38ab3376="" className="category-item-right">
                                <MdOutlineClose onClick={handleCancelCategoryClick} className="btn-add pointer-cursor" style={{marginRight:"5px"}}/>
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

                        {categories.map((category, index) => (
                          <li data-v-38ab3376="" key={index} className="category-item" onClick={() => handleCategoryClick(category)}>
                            <p data-v-38ab3376=""
                               className={`text-overflow ${category.categoryID === selectedParentCategory.categoryID ? 'selected-category' : ''}`}
                            >{category.categoryName}</p>
                            <div data-v-38ab3376="" className="category-item-right">
                              <i data-v-38ab3376="" className="icon-next fashion-store-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                  <path className={`${category.categoryID === selectedParentCategory.categoryID ? 'selected-category' : ''}`}
                                      d="M23.5 15.5l-12-11c-.6-.6-1.5-.6-2.1 0-.2.2-.4.6-.4 1s.2.8.4 1l10.9 10-10.9 10c-.6.6-.6 1.5 0 2.1.3.3.7.4 1 .4.4 0 .7-.1 1-.4l11.9-10.9.1-.1c.3-.3.4-.7.4-1.1.1-.4 0-.8-.3-1z"></path>
                                </svg>
                              </i>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <ul data-v-38ab3376="" className="scroll-item" style={{paddingLeft:"6px"}}>
                        {
                          selectedParentCategory.categoryName?
                            <div>
                              {isAddingSubcategory ?
                                <li data-v-38ab3376="" className="category-item" style={{background:"white"}}>
                                  <div data-v-38ab3376="" className="text-overflow">
                                    <input className="input-category" type="text" ref={inputSubcategoryRef}
                                           onChange={(e) => setInputSubcategoryValue(e.target.value)}/>
                                  </div>
                                  <div data-v-38ab3376="" className="category-item-right">
                                    <MdOutlineClose onClick={handleCancelSubcategoryClick} className="btn-add pointer-cursor" style={{marginRight:"5px"}}/>
                                    <BsCheckLg onClick={handleSaveSubcategoryClick} className="btn-add pointer-cursor"/>
                                  </div>
                                </li>
                                :
                                <li data-v-38ab3376="" className="category-item" onClick={handleAddSubcategoryClick}>
                                  <div data-v-38ab3376="" className="text-overflow">
                                    <HiPlus className="btn-add pointer-cursor" style={{marginBottom:"4px", marginRight:"5px"}}/> Thêm danh mục
                                  </div>
                                </li>
                              }
                            </div>
                          : <></>
                        }

                        {
                          getSubcategoriesByParentCategoryID(selectedParentCategory.categoryID).map((subcategory, index) => (
                            <li data-v-38ab3376="" className="category-item" key={index}
                                onClick={() => handleSubcategoryClick(subcategory)}>
                              <p data-v-38ab3376="" className={`text-overflow ${subcategory.categoryID === selectedCategory.categoryID ? 'selected-category' : ''}`}>
                                {subcategory.categoryName}
                              </p>
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

              {
                selectedParentCategory.categoryName ?
                  <span style={{fontSize:"14px", marginRight: "5px"}} >
                    {selectedParentCategory.categoryName}

                    {
                      selectedCategory.categoryName ?
                        (" > " + selectedCategory.categoryName)
                      :
                        ""
                    }
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

              {
                selectedCategory.categoryName && selectedParentCategory.categoryName ?
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
