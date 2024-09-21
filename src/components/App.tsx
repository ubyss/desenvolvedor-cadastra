import React, { useState } from 'react';
import { Product } from '../ts/Product';
import Footer from './Footer';
import Header from './Header'
import ProductList from './ProductList'

const App = () => {

    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCart((prevCart) => [...prevCart, product]);
    };


    return (
        <>
            <Header cartItemCount={cart.length} />
            <ProductList addToCart={addToCart} />
            <Footer />
        </>
    )
}

export default App