import {memo} from "react";
import "./style.scss"
import SlideBanner from "./SlideBanner/SlideBanner";
import SubBanner from "./SubBanner/SubBanner";
import CategorySection from "./CategorySection/CategorySection";
import ImageBanner from "./ImageBanner/ImageBanner";
import CollectionSection from "./CollectionSection/CollectionSection";

const shirtCollection = [
  {
    tab: { id: "tab-1", title: "Áo Polo" },
    products: [
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      // Thêm sản phẩm khác vào đây
    ],
  },
  {
    tab: { id: "tab-2", title: "Áo Tshirt" },
    products: [
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
      {
        title: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
        image: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
        link: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
        price: "149.000đ",
        originPrice: "399.000đ",
        soldCount: "303",
        stars: 5,
      },
    ],
  },
  {
    tab: { id: "tab-3", title: "Áo Tanktop" },
    products: [
      // Danh sách sản phẩm cho tab-3
    ],
  },
];

const HomePage = () => {
    return (
        <main id="main">
          <SlideBanner />
          <SubBanner />
          <section className="home-content">
            <CategorySection />
            <ImageBanner />
            <CollectionSection collectionData={shirtCollection} />
            <ImageBanner />
            <CollectionSection collectionData={shirtCollection} />
          </section>

        </main>
    );
}

export default memo(HomePage);