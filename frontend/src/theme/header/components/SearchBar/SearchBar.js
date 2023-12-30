import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import search from "../../../images/search.svg";
import SearchDialog from "./SearchDialog";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDialog, setShowSearchDialog] = useState(false);

  // Hàm xử lý khi người dùng nhấp vào trường tìm kiếm
  const handleInputFocus = () => {
    setShowSearchDialog(true);
  };

  // Hàm xử lý khi người dùng thay đổi giá trị nhập vào trường tìm kiếm
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSearchDialog(query !== ''); // Hiển thị SearchDialog nếu có văn bản
  };

  // Hàm xử lý khi người dùng bấm phím trong trường tìm kiếm
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowSearchDialog(false);
    }
  };

  const searchBarRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setShowSearchDialog(false);
      }
      else if (searchBarRef.current && searchBarRef.current.contains(event.target)) {
        setShowSearchDialog(true)
      }
    };

    document.addEventListener('click', handleClick);
    // document.addEventListener('k')
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
      <div className="search-box position-relative">
        <div>
          <input
              id="search-product"
              name="query"
              autoComplete="off"
              type="text"
              className="input-search form-control w-100 h-100 d-flex align-items-center"
              placeholder="Tìm kiếm sản phẩm ..."
              value={searchQuery}
              onChange={handleInputChange}
              // onFocus={handleInputFocus}
              // onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              ref={searchBarRef}
          />
          <button
              className="btn btn-search position-absolute d-flex align-items-center justify-content-center"
              onClick={() => {
                setShowSearchDialog(false);
                if (searchQuery) navigate("/search/" + searchQuery);
              }}
          >
            <img src={search} className="icon-search" alt="icon search" />
          </button>
          {searchQuery && showSearchDialog && (
              <div>
                <SearchDialog keyword={searchQuery}/>
              </div>
          )}
        </div>
      </div>
  );
}

export default SearchBar;