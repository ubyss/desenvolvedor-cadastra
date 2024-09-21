import React, { useState } from 'react';

interface FilterSectionProps {
    colors: string[],
    sizes: string[],
    setColorFilter: (color: string) => void,
    setSizeFilter: (size: string) => void,
    setPriceFilter: (range: [number, number]) => void,
    colorFilter: string,
    sizeFilter: string,
    priceFilter: [number, number]
}

const FilterSection: React.FC<FilterSectionProps> = ({
    colors,
    sizes,
    setColorFilter,
    setSizeFilter,
    setPriceFilter,
    colorFilter,
    sizeFilter,
    priceFilter
}) => {
    const [isColorOpen, setIsColorOpen] = useState(false);
    const [isSizeOpen, setIsSizeOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);

    const isMobile = () => window.innerWidth <= 768;

    return (
        <div className="filter-section">
            <div className="filter-category">
                <h2 className="filter-section__title" onClick={() => isMobile() && setIsColorOpen(!isColorOpen)}>
                    CORES
                    {isMobile() && (
                        <span className={`toggle-icon ${isColorOpen ? 'open' : ''}`}>
                            {isColorOpen ? (<svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 13.9999L10 0.999937L0.999998 13.9864" stroke="#666666" stroke-linecap="round" />
                            </svg>
                            ) : (<svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L10 14L19 1.0135" stroke="#666666" stroke-linecap="round" />
                            </svg>
                            )}
                        </span>
                    )}
                </h2>
                <ul className={`filter-section__colors ${isMobile() ? (isColorOpen ? 'open' : 'closed') : 'open'}`}>
                    {colors.map((color) => (
                        <li key={color}>
                            <label>
                                <input
                                    type="radio"
                                    name="color"
                                    checked={colorFilter === color}
                                    onChange={() => setColorFilter(color)}
                                />
                                {color}
                            </label>
                        </li>
                    ))}
                </ul>
                {colorFilter && (
                    <button
                        className="filter-section__remove-filter"
                        onClick={() => setColorFilter('')}
                    >
                        Remover seleção de cor
                    </button>
                )}
            </div>

            <div className="filter-category">
                <h2 className="filter-section__title" onClick={() => isMobile() && setIsSizeOpen(!isSizeOpen)}>
                    TAMANHOS
                    {isMobile() && (
                        <span className={`toggle-icon ${isSizeOpen ? 'open' : ''}`}>
                            {isSizeOpen ? (<svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 13.9999L10 0.999937L0.999998 13.9864" stroke="#666666" stroke-linecap="round" />
                            </svg>
                            ) : (<svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L10 14L19 1.0135" stroke="#666666" stroke-linecap="round" />
                            </svg>
                            )}
                        </span>
                    )}
                </h2>
                <div className={`filter-section__sizes ${isMobile() ? (isSizeOpen ? 'open' : 'closed') : 'open'}`}>
                    {sizes.map((size) => (
                        <div
                            key={size}
                            className={`size-square ${sizeFilter === size ? 'selected' : ''}`}
                            onClick={() => setSizeFilter(size)}
                        >
                            {size}
                        </div>
                    ))}
                    {sizeFilter && (
                        <button
                            className="filter-section__remove-filter"
                            onClick={() => setSizeFilter('')}
                        >
                            Remover filtro de tamanho
                        </button>
                    )}
                </div>
            </div>

            <div className="filter-category">
                <h2 className="filter-section__title" onClick={() => isMobile() && setIsPriceOpen(!isPriceOpen)}>
                    FAIXA DE PREÇO
                    {isMobile() && (
                        <span className={`toggle-icon ${isPriceOpen ? 'open' : ''}`}>
                            {isPriceOpen ? (<svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 13.9999L10 0.999937L0.999998 13.9864" stroke="#666666" stroke-linecap="round" />
                            </svg>
                            ) : (<svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L10 14L19 1.0135" stroke="#666666" stroke-linecap="round" />
                            </svg>
                            )}
                        </span>
                    )}
                </h2>
                <ul className={`filter-section__prices ${isMobile() ? (isPriceOpen ? 'open' : 'closed') : 'open'}`}>
                    <li>
                        <label>
                            <input
                                type="radio"
                                name="price"
                                checked={priceFilter[0] === 0 && priceFilter[1] === 50}
                                onChange={() => setPriceFilter([0, 50])}
                            />
                            de R$0 até R$50
                        </label>
                    </li>
                    <li>
                        <label>
                            <input
                                type="radio"
                                name="price"
                                checked={priceFilter[0] === 51 && priceFilter[1] === 150}
                                onChange={() => setPriceFilter([51, 150])}
                            />
                            de R$51 até R$150
                        </label>
                    </li>
                    <li>
                        <label>
                            <input
                                type="radio"
                                name="price"
                                checked={priceFilter[0] === 151 && priceFilter[1] === 300}
                                onChange={() => setPriceFilter([151, 300])}
                            />
                            de R$151 até R$300
                        </label>
                    </li>
                    <li>
                        <label>
                            <input
                                type="radio"
                                name="price"
                                checked={priceFilter[0] === 301 && priceFilter[1] === 500}
                                onChange={() => setPriceFilter([301, 500])}
                            />
                            de R$301 até R$500
                        </label>
                    </li>
                    <li>
                        <label>
                            <input
                                type="radio"
                                name="price"
                                checked={priceFilter[0] === 501 && priceFilter[1] === Infinity}
                                onChange={() => setPriceFilter([501, Infinity])}
                            />
                            a partir de R$500
                        </label>
                    </li>
                </ul>
                {!(priceFilter[0] === 0 && priceFilter[1] === Infinity) && (
                    <button
                        className="filter-section__remove-filter"
                        onClick={() => setPriceFilter([0, Infinity])}
                    >
                        Remover seleção de preço
                    </button>
                )}
            </div>
        </div>
    );
}

export default FilterSection
