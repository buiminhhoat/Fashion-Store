import {memo, useState} from "react";
import "./style.scss";
const CategoryDialog = ({ onClose }) => {
  const handleButtonCloseClick = () => {
    onClose();
  };

  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      name: "Thời Trang Nữ",
      subcategories: [
        {
          name: "Áo Nữ",
        },
        {
          name: "Áo Nữ",
        },
        {
          name: "Áo Nữ",
        },
      ],
    },
    {
      name: "Thời Trang Nam",
    },
  ];

  const getSubcategoriesByName = (categoryName) => {
    const selectedCategory = categories.find((category) => category.name === categoryName);
    return selectedCategory ? (selectedCategory.subcategories ? selectedCategory.subcategories : []) : [];
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
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

                            <li data-v-38ab3376="" className="category-item" onClick={() => handleCategoryClick(category.name)}>
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
                        {getSubcategoriesByName(selectedCategory).map((category, index) => (
                            <li data-v-38ab3376="" className="category-item">
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
            <div data-v-59dc2242="" className="category-selected">
              <span data-v-59dc2242="" className="label">Đã chọn: </span>
              <span data-v-59dc2242="" className="no-select">Chưa chọn ngành hàng</span>
            </div>
            <div className="fashion-store-modal__footer-buttons">
              <button type="button"
                      className="fashion-store-button fashion-store-button--normal"
                      onClick={handleButtonCloseClick}>
                <span>Hủy</span>
              </button>
              <button type="button" disabled="disabled"
                      className="fashion-store-button fashion-store-button--primary fashion-store-button--normal disabled">
                <span>Xác nhận</span></button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default memo(CategoryDialog);
