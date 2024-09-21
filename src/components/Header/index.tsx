import React from 'react';

interface HeaderProps {
    cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount }) => {
    return (
        <div className='header-container'>
            <img className='header-logo' src="./../img/logo.svg" alt="Logo" />
            <div className='header-minicart'>
                <img className='header-minicart-icon' src="./../img/minicart_icon.svg" alt="Mini Cart" />
                {cartItemCount > 0 && (
                    <span className='header-cart-count'>{cartItemCount}</span>
                )}
            </div>
        </div>
    );
};

export default Header;
