import { memo } from "react";
import './style.scss';

const productCategories = [
  {
    name: 'Áo Polo Nam',
    imageUrl:
        'https://5sfashion.vn/storage/upload/images/categories/09pCXgFMHH9UeQsMOqISQJgWz4TL213J8BPKKGOj.png',
    link: 'https://5sfashion.vn/danh-muc/ao-polo-nam',
  },
  {
    name: 'Áo Polo Nam',
    imageUrl:
        'https://5sfashion.vn/storage/upload/images/categories/09pCXgFMHH9UeQsMOqISQJgWz4TL213J8BPKKGOj.png',
    link: 'https://5sfashion.vn/danh-muc/ao-polo-nam',
  },
  {
    name: 'Áo Polo Nam',
    imageUrl:
        'https://5sfashion.vn/storage/upload/images/categories/09pCXgFMHH9UeQsMOqISQJgWz4TL213J8BPKKGOj.png',
    link: 'https://5sfashion.vn/danh-muc/ao-polo-nam',
  },
  {
    name: 'Áo Polo Nam',
    imageUrl:
        'https://5sfashion.vn/storage/upload/images/categories/09pCXgFMHH9UeQsMOqISQJgWz4TL213J8BPKKGOj.png',
    link: 'https://5sfashion.vn/danh-muc/ao-polo-nam',
  },
  {
    name: 'Áo Polo Nam',
    imageUrl:
        'https://5sfashion.vn/storage/upload/images/categories/09pCXgFMHH9UeQsMOqISQJgWz4TL213J8BPKKGOj.png',
    link: 'https://5sfashion.vn/danh-muc/ao-polo-nam',
  },
  {
    name: 'Áo Polo Nam',
    imageUrl:
        'https://5sfashion.vn/storage/upload/images/categories/09pCXgFMHH9UeQsMOqISQJgWz4TL213J8BPKKGOj.png',
    link: 'https://5sfashion.vn/danh-muc/ao-polo-nam',
  },
  {
    name: 'Áo Polo Nam',
    imageUrl:
        'https://5sfashion.vn/storage/upload/images/categories/09pCXgFMHH9UeQsMOqISQJgWz4TL213J8BPKKGOj.png',
    link: 'https://5sfashion.vn/danh-muc/ao-polo-nam',
  },
  {
    name: 'Áo Polo Nam',
    imageUrl:
        'https://5sfashion.vn/storage/upload/images/categories/09pCXgFMHH9UeQsMOqISQJgWz4TL213J8BPKKGOj.png',
    link: 'https://5sfashion.vn/danh-muc/ao-polo-nam',
  },
  {
    name: 'Áo Polo Nam',
    imageUrl:
        'https://5sfashion.vn/storage/upload/images/categories/09pCXgFMHH9UeQsMOqISQJgWz4TL213J8BPKKGOj.png',
    link: 'https://5sfashion.vn/danh-muc/ao-polo-nam',
  },
  {
    name: 'Áo Polo Nam',
    imageUrl:
        'https://5sfashion.vn/storage/upload/images/categories/09pCXgFMHH9UeQsMOqISQJgWz4TL213J8BPKKGOj.png',
    link: 'https://5sfashion.vn/danh-muc/ao-polo-nam',
  },
  {
    name: 'Áo Polo Nam',
    imageUrl:
        'https://5sfashion.vn/storage/upload/images/categories/09pCXgFMHH9UeQsMOqISQJgWz4TL213J8BPKKGOj.png',
    link: 'https://5sfashion.vn/danh-muc/ao-polo-nam',
  },
  {
    name: 'Áo Polo Nam',
    imageUrl:
        'https://5sfashion.vn/storage/upload/images/categories/09pCXgFMHH9UeQsMOqISQJgWz4TL213J8BPKKGOj.png',
    link: 'https://5sfashion.vn/danh-muc/ao-polo-nam',
  },
  {
    name: 'Áo Polo Nam',
    imageUrl:
        'https://5sfashion.vn/storage/upload/images/categories/09pCXgFMHH9UeQsMOqISQJgWz4TL213J8BPKKGOj.png',
    link: 'https://5sfashion.vn/danh-muc/ao-polo-nam',
  },
  // Thêm các danh mục sản phẩm khác vào đây
];

// Hàm render danh mục sản phẩm
const renderProductCategories = () => {
  return productCategories.map((category, index) => (
      <div className="owl-item active" key={index} style={{ width: '117.273px', marginRight: '1px' }}>
        <a href={category.link}>
          <div className="category-box">
            <div className="image-wrap position-relative w-100">
              <div className="image-wrap__img position-absolute w-100">
                <img
                    lazy-src={category.imageUrl}
                    alt={`Icon danh mục SP 400 x 400 px_${category.name}`}
                    loading="lazy"
                    src={category.imageUrl}
                />
              </div>
            </div>
            <div className="text text-center">
              <p>{category.name}</p>
            </div>
          </div>
        </a>
      </div>
  ));
};

const CategorySection = () => {
  return (
      <section className="category">
        <div className="category-wrap">
          <div className="title">
            <p className="text-center mb-0">DANH MỤC SẢN PHẨM</p>
          </div>
          <div className="content owl-carousel owl-theme owl-loaded owl-drag" id="content-category">
            <div className="owl-stage-outer">
              <div className="owl-stage" style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s', width: '2721px' }}>
                {renderProductCategories()}
              </div>
            </div>
            <div className="owl-nav disabled">
              <button type="button" role="presentation" className="owl-prev hide">
                <span aria-label="Previous">‹</span>
              </button>
              <button type="button" role="presentation" className="owl-next show">
                <span aria-label="Next">›</span>
              </button>
            </div>
            <div className="owl-dots">
              <button role="button" className="owl-dot active">
                <span></span>
              </button>
              <button role="button" className="owl-dot">
                <span></span>
              </button>
              <button role="button" className="owl-dot">
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </section>
  );
};
export default memo(CategorySection);
