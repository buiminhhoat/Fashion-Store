import React, {useEffect, useState} from 'react';
import "./style.scss"
import SlideBanner from "./SlideBanner/SlideBanner";
import SubBanner from "./SubBanner/SubBanner";
import CategorySection from "./CategorySection/CategorySection";
import ImageBanner from "./ImageBanner/ImageBanner";
import CollectionSection from "./CollectionSection/CollectionSection";

// let shirtCollection = [
//   {
//     tab: { categoryID: "tab-1", categoryName: "Áo Polo" },
//     products: [
//       {
//         productName: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
//         productImages: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
//         productLink: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
//         productPrice: "149.000đ",
//       }
//     ],
//   },
//   {
//     tab: { categoryID: "tab-2", categoryName: "Áo Polo" },
//     products: [
//       {
//         productName: "Áo Polo Nam 5S, Thấm Hút Tốt, Thiết kế Basic APC23031",
//         productImages: "https://5sfashion.vn/storage/upload/images/products/NGrEEBn1PMdR8ZIrv8i4Gvg9U57CJFIqoL2CAoXi.jpg",
//         productLink: "https://5sfashion.vn/san-pham/ao-polo-nam-5s-chat-lieu-thoang-mat-tham-hut-tot-dung-form-thiet-ke-basic-apc23031",
//         productPrice: "149.000đ",
//       }
//     ],
//   },
//   {
//     tab: { categoryID: "tab-3", categoryName: "Áo Tanktop" },
//     products: [
//       // Danh sách sản phẩm cho tab-3
//     ],
//   },
// ];
//
// let collections = [shirtCollection];


const banner1 = {
  url: "https://5sfashion.vn/storage/upload/images/banners/U5Xo1sDIIk0c9889d6F15cIwqK60BHZsuiJ0pno6.png",
  link: "/profile/orders",
};

const HomePage = () => {
  const [collections, setCollections] = useState([]);
  const apiAllCategoriesGetRandom12Products = "http://localhost:9999/api/all-categories/get-random-12-products";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiAllCategoriesGetRandom12Products, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();

          let newCollections = [];
          data.forEach(category => {
            // Duyệt qua danh sách các danh mục con (subcategories)

            let subcollections = []
            category.subcategories.forEach(subcategory => {
              // Duyệt qua danh sách sản phẩm (productList)
              let products = [];
              subcategory.products.forEach(product => {
                let productJson = {
                  productID: product.productID,
                  productName: product.productName,
                  productPrice: product.productPrice,
                  productDescription: product.productDescription,
                  productImages: "http://localhost:9999/storage/images/" + product.productImages[0].imagePath,
                  productLink: "/",
                };
                console.log("productImages")
                console.log(productJson.productImages)
                products.push(productJson);
              });
              let subcollection = {
                tab: {
                  categoryID: subcategory.categoryID,
                  categoryName: subcategory.categoryName
                },
                products: products
              };
              subcollections.push(subcollection);
            });

            let collection = {
              name: category.categoryName,
              content: subcollections
            };

            newCollections.push(collection);
          });

          setCollections(newCollections);
        } else {
          const data = await response.json();
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
        alert('Không kết nối được với database');
      }
    }
    fetchData().then(r => {});
  }, []);

  return (
      <main id="main">
        <SlideBanner />
        <SubBanner />
        <section className="home-content">
          <CategorySection />
          {
            collections.map((collectionData, index) => (
                <CollectionSection key={index} collectionData={collectionData} />
            ))
          }
        </section>

      </main>
  );
}

export default HomePage;