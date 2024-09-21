// SortSection.tsx

import React, { useState, useEffect } from 'react';

interface SortSectionProps {
    sortOption: string;
    setSortOption: (option: string) => void;
}

const SortSection: React.FC<SortSectionProps> = ({ sortOption, setSortOption }) => {
    const isDefault = sortOption === '';
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
    const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (!mobile) {
                setIsOptionsVisible(false); // Fecha as opções se não for mobile
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sortOptions = [
        { value: 'mais recente', label: 'Mais Recente' },
        { value: 'menor preço', label: 'Menor Preço' },
        { value: 'maior preço', label: 'Maior Preço' },
    ];

    const handleOptionClick = (option: string) => {
        setSortOption(option);
        setIsOptionsVisible(false); // Fecha a lista após selecionar
    };

    return (
        <div className="sort-section">
            <h2 className='category-name'>Blusas</h2>
            {isMobile ? (
                <div className="sort-mobile">
                    <div className="sort-mobile__options">
                        {sortOptions.map(option => (
                            <button
                                key={option.value}
                                className={`sort-mobile__option ${sortOption === option.value ? 'selected' : ''}`}
                                onClick={() => handleOptionClick(option.value)}
                                aria-pressed={sortOption === option.value}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className={`sort-select ${!isDefault ? 'selected' : ''}`}
                    aria-label="Ordenar produtos"
                >
                    <option value="" disabled>
                        Ordenar por:
                    </option>
                    <option value="mais recente">Mais Recente</option>
                    <option value="menor preço">Menor Preço</option>
                    <option value="maior preço">Maior Preço</option>
                </select>
            )}
        </div>
    );
};

export default SortSection;
