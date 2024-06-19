import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import Login from './components/login-register/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import AddAuthor from './components/admin-pages/AddAuthor'
import AddCategory from './components/admin-pages/AddCategory'
import AddProduct from './components/admin-pages/AddProduct'

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            {/* <Route path='/add-author' element={<AddAuthor />} /> */}
            <Route path='/add-category' element={<AddCategory />} />
            <Route path='/add-product' element={<AddProduct />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
)
export default Router