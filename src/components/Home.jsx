import React, { useContext, useEffect, useState } from 'react'

import '../index.css'

import SuccessSnackBar from './common/SuccessSnackBar'
import Footer from './common/Footer'
import NavBarComponent from './navbar/NavBarComponent'
import AddAuthor from './admin-pages/AddAuthor'
import MyShop from './user-pages/MyShop'
import AddCategory from './admin-pages/AddCategory'
import AddProduct from './admin-pages/AddProduct'
import AddPdf from './admin-pages/AddPdf'
import ViewOrders from './admin-pages/ViewOrders'
import MyProfile from './user-pages/MyProfile'
import LoggedUserBookView from './LoggedUserBookView'
import Subscribe from './user-pages/Subscribe'

import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from "react-router-dom";
import { fetchProducts } from '../ApiUtils/Product'
import { onBookResetChange } from '../Redux/modules/books/actions'

import { useMediaQuery, useTheme } from '@mui/material'

import { jwtDecode } from 'jwt-decode'
import { setAccessToken } from '../Redux/modules/accessToken/actions'
import { UserInfoContext } from '../contexts/UserInfoContext'

import axios from 'axios';

const Home = () => {

    const theme = useTheme()
    const smBreakpoint = useMediaQuery(theme.breakpoints.down('sm'))
    const mdBreakpoint = useMediaQuery(theme.breakpoints.down('md'))
    const bookState = useSelector((state) => state.books);
    const changeBooks = bookState.changeOnBook;
    const dispatch = useDispatch();

    const [token, setToken] = useState(null);
    const [openLogout, setOpenLogout] = useState(false);
    const [successLogout, setSuccessLogout] = useState('');
    const [products, setProducts] = useState([]);
    const [categoryCards, setCategoryCardS] = useState('');
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const productsPerPage = smBreakpoint ? 1 : mdBreakpoint ? 2 : 3;


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            dispatch(setAccessToken(storedToken));
        }
    }, [dispatch]);


    const handleChangeCategory = (event) => {
        setCategoryCardS(event.target.value);
        setCurrentPage(1);
    };

    const loadProducts = async () => {
        try {
            const response = await fetchProducts(token);
            setProducts(response.data)
        } catch (error) {
            console.log('Log fetch', error);
            setError('Failed to get authors')
        }
    };

    useEffect(() => {
        if (token) {
            loadProducts();
            getUser()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        if (categoryCards === 'None') {
            setCategoryCardS(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, categoryCards]);

    useEffect(() => {
        if (changeBooks) {
            loadProducts();
            dispatch(onBookResetChange())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, changeBooks]);

    const filteredProducts = products?.filter((product) => {
        const matchesCategory = categoryCards ? product.category.name === categoryCards : true;
        const matchesSearch = searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        const matchesAuthor = searchTerm ? product.author.firstName.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        return matchesCategory && matchesSearch | matchesAuthor;
    });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const onCloseSuccess = (e, reason) => {
        if (reason === 'clickaway') return;
        setOpenLogout(false);
    };

    if (error) {
        <div>{error}</div>
    }

    let decodedToken = null;

    if (token) {
        try {
            decodedToken = jwtDecode(token);
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    }
    const { setUserInfo } = useContext(UserInfoContext);
    const getUser = async () => {
        try {
            const response = await axios.get('https://bibliotekamk-4931b6242b27.herokuapp.com/api/users/', {
                params: {
                    email: decodedToken?.sub
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setUserInfo(response.data)
        } catch (error) {
            console.log('Error fetching user:', error);
        }
    };

    return (
        <>
            <div className='homeBackground'>
                <NavBarComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    setCategoryCardS={setCategoryCardS}
                    setSuccessLogout={setSuccessLogout}
                    setOpenLogout={setOpenLogout}
                    decodedToken={decodedToken}
                    categoryCards={categoryCards}
                    handleChangeCategory={handleChangeCategory}
                />
                <Footer />
                <Routes>
                    <Route path='/' element={<LoggedUserBookView
                        currentPage={currentPage}
                        currentProducts={currentProducts}
                        handleNextPage={handleNextPage}
                        handlePrevPage={handlePrevPage}
                        decodedToken={decodedToken}
                        totalPages={totalPages}
                    />} />
                    <Route path='/add-author' element={<AddAuthor />} />
                    <Route path='/add-category' element={<AddCategory />} />
                    <Route path='/add-product' element={<AddProduct />} />
                    <Route path='/add-pdf' element={<AddPdf products={products} />} />
                    <Route path='/orders' element={<ViewOrders />} />
                    <Route path='/my-profile' element={<MyProfile />} />
                    <Route path='/my-shop' element={<MyShop decodedToken={decodedToken} />} />
                    <Route path='/subscribe' element={<Subscribe />} />
                </Routes>

            </div >
            <SuccessSnackBar open={openLogout} alertMessage={successLogout} close={onCloseSuccess} />
        </>
    )
}

export default Home