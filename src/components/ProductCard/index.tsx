import React, { useState, useEffect } from 'react';
import { Product } from '../../ts/Product';

const ProductCard: React.FC<{ product: Product; addToCart: (product: Product) => void }> = ({ product, addToCart }) => (
    <div className="product-card">
        <img src={product.image} alt={product.name} className="product-card__image" />
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__price">R$ {product.price.toFixed(2)}</p>
        <p className="product-card__parcelamento">até {product.parcelamento[0]}x de R$ {product.parcelamento[1].toFixed(2)}</p>
        <button onClick={() => addToCart(product)} className="product-card__buy-button">COMPRAR</button>
    </div>
);


export default ProductCard