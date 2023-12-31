import React, {useState} from "react";
import "./style.scss"
import {MdOutlinePlaylistAdd} from "react-icons/md";
import {toast} from "react-toastify";
import {isStartWithLetter} from "../../../../../../../utils";
import {useCookies} from "react-cookie";
import {MESSAGE} from "../../../../../../../utils/const";

const AddCategoryDialog = ({parentCategoryID, onAccept, onClose}) => {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const [inputValue, setInputValue] = useState('');

  const handleAddCategory = async () => {
    if (inputValue === "") {
      toast.warn(MESSAGE.MISSING_CATEGORY_NAME);
      return;
    }
    if (!isStartWithLetter(inputValue)) {
      toast.warn(MESSAGE.CATEGORY_NAME_INVALID);
      return;
    }

    const formData = new FormData();
    formData.append('categoryName', inputValue);
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
        onAccept();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(MESSAGE.DB_CONNECTION_ERROR);
    }
  };

  return (
      <div className="modal fade show" id="modal-auth" tabIndex="-1" aria-labelledby="exampleModalLabel"
           style={{ display: 'block', paddingLeft: '0px' }} aria-modal="true" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{color:"#333333", padding:"30px", width:"550px"}}>
            <div style={{marginBottom:"13px"}}>
              <MdOutlinePlaylistAdd style={{fontSize:"27px", margin:"0 7px 5px 0"}} />
              <span style={{fontSize:"20px", fontWeight:"900"}}>Thêm danh mục</span>
            </div>

            <div data-v-38ab3376="" className="text-overflow">
              <input className="input-add-category"
                     type="text"
                     value={inputValue}
                     placeholder={"Nhập tên danh mục"}
                     onChange={(e) => setInputValue(e.target.value)}/>
            </div>

            <div className="button-container" style={{marginTop:"40px"}}>
              <button type="button" className="add-category-dialog-btn" onClick={handleAddCategory}>Thêm</button>
              <button type="button" className="add-category-dialog-btn add-category-dialog-btn-cancel" onClick={onClose}>Hủy</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default AddCategoryDialog;