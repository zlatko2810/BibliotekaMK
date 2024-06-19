import React, { useEffect, useState } from 'react'

import { Route, Routes } from 'react-router-dom'

import VisitorNavBar from './visitor/VisitorNavBar'
import AboutUs from './visitor/AboutUs'
import Contact from './visitor/Contact'
import Footer from './common/Footer'
import BookView from './visitor/BookView'

import { useMediaQuery, useTheme } from '@mui/material'

import { useSelector } from 'react-redux'

import axios from 'axios';

const LandingPage = () => {

    const theme = useTheme()
    const smBreakpoint = useMediaQuery(theme.breakpoints.down('sm'))
    const mdBreakpoint = useMediaQuery(theme.breakpoints.down('md'))

    const bookState = useSelector((state) => state.books);
    const changeBooks = bookState.changeOnBook;
    const [products, setProducts] = useState([]);
    const [categoryCards, setCategoryCardS] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const productsPerPage = smBreakpoint ? 1 : mdBreakpoint ? 2 : 3;
    
    const loadProducts = async () => {
        try {
            const response = await axios.get('https://bibliotekamk-4931b6242b27.herokuapp.com/api/products/', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setProducts(response.data);
        } catch (error) {
            console.log('Error fetching products:', error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, [])

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

    const handleChangeCategory = (event) => {
        setCategoryCardS(event.target.value);
        setCurrentPage(1);
    };

    useEffect(() => {
        if (changeBooks) {
            loadProducts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changeBooks]);

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

    useEffect(() => {
        if (categoryCards === 'None') {
            setCategoryCardS(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryCards]);

    return (
        <div className='homeBackground'>
            <VisitorNavBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setCategoryCardS={setCategoryCardS}
                categoryCards={categoryCards}
                handleChangeCategory={handleChangeCategory}
            />
            <Footer />
            <Routes>
                <Route path='/' element={<BookView
                    currentProducts={currentProducts}
                    handlePrevPage={handlePrevPage}
                    currentPage={currentPage} handleNextPage={handleNextPage}
                    totalPages={totalPages}
                />} />
                <Route path='/about-us' element={<AboutUs />} />
                <Route path='/contact' element={<Contact />} />
            </Routes>
        </div>
    )
}

export default LandingPage