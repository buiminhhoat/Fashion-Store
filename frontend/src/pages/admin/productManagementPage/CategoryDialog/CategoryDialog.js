import {memo, useState} from "react";
import "./style.scss";
const CategoryDialog = ({ onClose, onConfirm }) => {
  const handleButtonCloseClick = () => {
    onClose();
  };

  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [selectedCategoriesName, setSelectedCategoriesName] = useState(null);

  const categories = [
    {
      id: 1,
      name: "Thời Trang Nữ",
      subcategories: [
        {
          id: 2,
          name: "Áo Nữ 1",
        },
        {
          id: 3,
          name: "Áo Nữ 2",
        },
        {
          id: 4,
          name: "Áo Nữ 3",
        },
      ],
    },
    {
      id: 5,
      name: "Thời Trang Nam",
      subcategories: [
        {
          id: 6,
          name: "Áo Nam 1",
        },
      ],
    },
  ];

  const getSubcategoriesByName = (categoryName) => {
    const selectedCategory = categories.find((category) => category.name === categoryName);
    return selectedCategory ? (selectedCategory.subcategories ? selectedCategory.subcategories : []) : [];
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategoryName(categoryName);
    setSelectedCategoriesName([categoryName]);
  };

  const handleSubcategoryClick = (categoryName) => {
    const newSelectedCategoriesName = [selectedCategoriesName[0], categoryName];
    setSelectedCategoriesName(newSelectedCategoriesName);
  };

  const handleSubmitCategoryDialog = () => {
    onConfirm(selectedCategoriesName);
  };

  return (
      <div>
        <div className="fashion-store-modal__content fashion-store-modal__content--normal" style={{width:"700px"}}>
          <div className="fashion-store-modal__header" style={{position: "relative"}}>
            <button type="button"
                    className="btn-close category-dialog-btn-close pointer-cursor"
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
                <div data-v-38ab3376="" className="selector" style={{marginBottom:"30px"}}>

                  <div data-v-38ab3376="" className="category-wrap">
                    <div data-v-38ab3376="" className="category-list">

                      <ul data-v-38ab3376="" className="scroll-item" style={{paddingLeft:"5px"}}>
                        {categories.map((category, index) => (

                            <li data-v-38ab3376="" className="category-item" key={category.id} onClick={() => handleCategoryClick(category.name)}>
                              <p data-v-38ab3376="" className="text-overflow">
                                {category.name}
                              </p>
                              <div data-v-38ab3376="" className="category-item-right">
                                <i data-v-38ab3376="" className="icon-next fashion-store-icon">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                    <path
                                        d="M23.5 15.5l-12-11c-.6-.6-1.5-.6-2.1 0-.2.2-.4.6-.4 1s.2.8.4 1l10.9 10-10.9 10c-.6.6-.6 1.5 0 2.1.3.3.7.4 1 .4.4 0 .7-.1 1-.4l11.9-10.9.1-.1c.3-.3.4-.7.4-1.1.1-.4 0-.8-.3-1z"></path>
                                  </svg>
                                </i>
                              </div>
                            </li>
                        ))}
                      </ul>

                      <ul data-v-38ab3376="" className="scroll-item" style={{paddingLeft:"6px"}}>
                        {getSubcategoriesByName(selectedCategoryName).map((category, index) => (
                            <li data-v-38ab3376="" className="category-item" key={category.id} onClick={() => handleSubcategoryClick(category.name)}>
                              <p data-v-38ab3376="" className="text-overflow">
                                {category.name}
                              </p>
                            </li>
                        ))}

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
              {(selectedCategoriesName ? selectedCategoriesName : []).length === 0 ? <span style={{fontSize:"14px", marginRight: "5px"}} >Chưa chọn ngành hàng</span> : ""}
              {(selectedCategoriesName ? selectedCategoriesName : []).map((categoryName, index) => (
                  <span key={index} style={{fontSize:"14px", marginRight: "5px"}} >
                    {categoryName} {index < selectedCategoriesName.length - 1 ? ", " : ""}
                  </span>

              ))}
            </div>
            <div className="fashion-store-modal__footer-buttons">
              <button type="button"
                      className="fashion-store-button fashion-store-button--normal"
                      onClick={handleButtonCloseClick}>
                <span>Hủy</span>
              </button>
              {(selectedCategoriesName ? selectedCategoriesName : []).length === 2 ?
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

export default memo(CategoryDialog);
