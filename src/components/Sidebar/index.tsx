import React from 'react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    sidebarContent: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, children, sidebarContent }) => {
    console.log('@@sidebarContent', sidebarContent);

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar__header">
                <h3 className='sidebar__name'>{sidebarContent === 'filter' ? 'Filtrar' : 'Ordenar'}</h3>
                <button className="sidebar__close-button" onClick={onClose}>
                    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 18.852L17.5547 1.00001" stroke="black" />
                        <line y1="-0.5" x2="25.2899" y2="-0.5" transform="matrix(0.711746 0.702437 -0.874311 0.485367 0 1.23547)" stroke="black" />
                    </svg>

                </button>
            </div>
            <div className="sidebar__content">
                {children}
            </div>
        </div>
    );
};

export default Sidebar;
