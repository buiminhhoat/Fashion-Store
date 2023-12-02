import {ROUTERS} from "./utils/router";
import {Route, Routes} from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu/NavigationMenu";
import NotFoundPage from "../../error/notFoundPage";
import AddProductPage from "./productManagement/addProduct";
import EditProductPage from "./productManagement/editProduct";
import ProductListPage from "./productManagement/productList";

const renderCustom = () => {
    const routers =  [
        {
            path: ROUTERS.ADMIN.ADD_PRODUCT,
            component: <AddProductPage />
        },
        {
            path: ROUTERS.ADMIN.EDIT_PRODUCT,
            component: <EditProductPage />
        },
        {
            path: ROUTERS.ADMIN.PRODUCT_LIST,
            component: <ProductListPage />
        }
    ]

    return (
        <div style={{display:"flex", justifyContent:"flex-start"}}>
            <NavigationMenu/>
            <div style={{width:"100%", minHeight:"630px", paddingLeft:"30px",backgroundColor: "#f5f5f5"}}>
                <Routes>
                    {
                        routers.map((item, key) => (
                            <Route key={key} path={item.path} element={item.component} />
                        ))
                    }
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </div>
        </div>
    )
}

const RouterCustom = () => {
    return renderCustom();
}

export default RouterCustom;