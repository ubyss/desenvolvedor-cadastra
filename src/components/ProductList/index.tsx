import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../../ts/Product';
import FilterSection from '../FilterSection';
import ProductCard from '../ProductCard';
import SortSection from '../SortSection';
import Sidebar from '../Sidebar';

interface ProductListProps {
    addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ addToCart }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [colorFilter, setColorFilter] = useState<string>('');
    const [sizeFilter, setSizeFilter] = useState<string>('');
    const [priceFilter, setPriceFilter] = useState<[number, number]>([0, Infinity]);
    const [sortOption, setSortOption] = useState<string>('');
    const [page, setPage] = useState(1);
    const [colors, setColors] = useState<string[]>([]);
    const [sizes, setSizes] = useState<string[]>([]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sidebarContent, setSidebarContent] = useState<'filter' | 'sort'>('filter');

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        console.log('Filtros aplicados:', { colorFilter, sizeFilter, priceFilter, sortOption });
        filterProducts();
    }, [products, colorFilter, sizeFilter, priceFilter, sortOption]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/products');
            const data = await response.json();

            const productsWithUniqueIds = data.map((product: Product) => ({
                ...product,
                uniqueId: uuidv4(),
            }));

            setProducts(productsWithUniqueIds);

            const uniqueColors = Array.from(new Set(productsWithUniqueIds.map((product: Product) => product.color))) as string[];
            setColors(uniqueColors);

            const uniqueSizes = Array.from(new Set(productsWithUniqueIds.flatMap((product: Product) => product.size))) as string[];
            setSizes(uniqueSizes);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const filterProducts = () => {
        let filtered = [...products];

        if (colorFilter) {
            filtered = filtered.filter(p => p.color === colorFilter);
        }

        if (sizeFilter) {
            filtered = filtered.filter(p => p.size.includes(sizeFilter));
        }

        filtered = filtered.filter(p => p.price >= priceFilter[0] && p.price <= priceFilter[1]);

        if (sortOption === 'mais recente') {
            filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else if (sortOption === 'menor preço') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'maior preço') {
            filtered.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(filtered);
    };

    const loadMore = () => {
        setPage(prev => prev + 1);
    };

    const openFilterSidebar = () => {
        setSidebarContent('filter');
        setIsSidebarOpen(true);
    };

    const openSortSidebar = () => {
        setSidebarContent('sort');
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <>
            <div className="product-list">
                <h2 className='category-name category-mobile'>Blusas</h2>
                <div className="trigger-container">
                    <button className="trigger-filter trigger-button" onClick={openFilterSidebar}>Filtrar</button>
                    <button className="trigger-sort trigger-button" onClick={openSortSidebar}>Ordenar</button>
                </div>

                <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} sidebarContent={sidebarContent}>
                    {sidebarContent === 'filter' ? (
                        <FilterSection
                            colors={colors}
                            sizes={sizes}
                            setColorFilter={setColorFilter}
                            setSizeFilter={setSizeFilter}
                            setPriceFilter={setPriceFilter}
                            colorFilter={colorFilter}
                            sizeFilter={sizeFilter}
                            priceFilter={priceFilter}
                        />
                    ) : (
                        <SortSection
                            sortOption={sortOption}
                            setSortOption={setSortOption}
                        />
                    )}
                </Sidebar>

                <div className="desktop-filters-sort">
                    <SortSection sortOption={sortOption} setSortOption={setSortOption} />
                </div>

                <div className="desktop-filters-filter">
                    <FilterSection
                        colors={colors}
                        sizes={sizes}
                        setColorFilter={setColorFilter}
                        setSizeFilter={setSizeFilter}
                        setPriceFilter={setPriceFilter}
                        colorFilter={colorFilter}
                        sizeFilter={sizeFilter}
                        priceFilter={priceFilter}
                    />
                </div>

                <div className="product-list__content">

                    <div className="product-list__grid">
                        {filteredProducts.slice(0, page * 9).map(product => (
                            <ProductCard key={product.uniqueId} product={product} addToCart={addToCart} />
                        ))}
                    </div>
                    {filteredProducts.length > page * 9 && (
                        <button onClick={loadMore} className="product-list__load-more">CARREGAR MAIS</button>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductList;
