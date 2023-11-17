import React, {useEffect, useRef, useState} from "react";
import "./style.scss"
import {toast} from "react-toastify";
import {HiOutlineTrash} from "react-icons/hi";
import {BiSolidEdit} from "react-icons/bi";
import {MdArrowDropDown, MdArrowRight} from "react-icons/md";
import {TbListSearch} from "react-icons/tb";
import {IoSearch} from "react-icons/io5";
import {useCookies} from "react-cookie";
import ConfirmDialog from "../../../../components/dialogs/ConfirmDialog/ConfirmDialog";

const ProductListPage  = () => {
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;

  const [deletedCategory, setDeletedCategory] = useState(null);

  const [selectedCategoriesID, setSelectedCategoriesID] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesImgID, setCategoriesImgID] = useState([]);

  async function fetchImageAsFile(imageUrl, imageName, categoryID) {
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
      toast.error("Không thể kết nối được với database");
    }
  }

  useEffect(() => {
    fetchData().then(r => {});
  }, []);

  async function changeImageCategory(imageFile, categoryID) {
    const formData = new FormData();
    formData.append('categoryID', categoryID);
    formData.append('categoryImage', imageFile);

    let apiAddProductUrl = "/api/admin/upload-category-image";
    fetch(apiAddProductUrl, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
      body: formData,
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Upload failed');
          }
          return response.json();
        })
        .then((data) => {

          const newCategoriesImgID = categoriesImgID.map(imgID => {
            return (imgID.categoryID === categoryID ? { ...imgID, imageFile: imageFile } : imgID);
          });
          setCategoriesImgID(newCategoriesImgID);

          toast.success("Cập nhật ảnh thành công");
          console.log('Upload successful:', data);
        })
        .catch((error) => {
          toast.error("Có lỗi xảy ra! Vui lòng thử lại");
          console.error('Upload failed:', error);
        });
  }

  const handleImageClick = (categoryID) => {
    document.getElementById(`img-input-${categoryID}`).click();
  };

  const handleFileChange = (e, categoryID) => {
    if (e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (file) {
      changeImageCategory(file, categoryID).then(r => {});
      console.log('Đã chọn file:', file);
    }
  };

  const handleCategoryClick = (categoryID) => {
      if (selectedCategoriesID.includes(categoryID)) {
        const updatedCategoriesID = selectedCategoriesID.filter((id) => id !== categoryID);
        setSelectedCategoriesID(updatedCategoriesID);
      } else {
        const updatedCategoriesID = [...selectedCategoriesID, categoryID];
        // const updatedCategoriesID = [categoryID];
        setSelectedCategoriesID(updatedCategoriesID);
      }
  }

  async function deleteCategory() {
    const formData = new FormData();
    formData.append('categoryID', deletedCategory.categoryID);

    let apiAddProductUrl = "/api/admin/delete-category";
    fetch(apiAddProductUrl, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
      body: formData,
    })
        .then(async (response) => {
          if (!response.ok) {
            const data = await response.json();
            toast.error(data.message);
            throw new Error('Failed');
          }
          return response.json();
        })
        .then(() => {
          toast.success("Đã xóa danh mục");
          setCategories((newCategories) =>
              newCategories.filter((category) => category.categoryID !== deletedCategory.categoryID)
          );
          setDeletedCategory(null);
        })
        .catch((error) => {
          // toast.error("Có lỗi xảy ra! Vui lòng thử lại");
          console.error('Failed:', error);
        });
  }

  const handleBtnDeleteCategoryClick = (e, categoryID, categoryName, type) => {
    e.stopPropagation();
    setDeletedCategory({
      type: type,
      categoryID: categoryID,
      categoryName: categoryName,
    })
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
                borderRadius:"4px", border:"2px solid #E4E4E4", padding:"0", backgroundColor:"#f9f9f9", height:"75px"}}>
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
                  borderRadius:"4px", border:"2px solid #E4E4E4", padding:"0", backgroundColor:"#f9f9f9"}}>

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
                                            src={categoriesImgID.find((imgID) => imgID.categoryID === subCategory.categoryID) ?
                                                URL.createObjectURL(categoriesImgID.find((imgID) => imgID.categoryID === subCategory.categoryID).imageFile) : ""}
                                            alt=""
                                            onClick={() => handleImageClick(subCategory.categoryID)}
                                        />
                                        <input
                                            type="file"
                                            id={`img-input-${subCategory.categoryID}`}
                                            accept="image/*"
                                            multiple="multiple"
                                            style={{ display: 'none' }}
                                            onChange={(e) => handleFileChange(e, subCategory.categoryID)}
                                        />
                                      </div>

                                      <div style={{marginLeft:"15px", fontSize:"17px", fontWeight:"600", color:"#9D9D9D"}}>
                                        {subCategory.categoryName}
                                      </div>
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

      </div>
  );
}

export default ProductListPage;