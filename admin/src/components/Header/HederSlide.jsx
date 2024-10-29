import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HederSlide = () => {
    // State to manage the visibility of submenus
    const [activeMenu, setActiveMenu] = useState(null);

    // Function to handle submenu toggle
    const handleMenuClick = (menuId) => {
        setActiveMenu(activeMenu === menuId ? null : menuId);
    };

    return (

        <aside className="page-sidebar">
            <div className="left-arrow" id="left-arrow">
                <i data-feather="arrow-left"></i>
            </div>
            <div className="main-sidebar" id="main-sidebar">
                <ul className="sidebar-menu" id="simple-bar">
                    <li className="sidebar-main-title">
                        <div>
                            <h5 className="lan-1 f-w-700 sidebar-title">General</h5>
                        </div>
                    </li>
                    <li className="sidebar-list">
                        <i className="fa-solid fa-thumbtack"></i>
                        <Link className="sidebar-link" to="/">
                            <svg className="stroke-icon">
                                <use href="../assets/svg/iconly-sprite.svg#Home-dashboard"></use>
                            </svg>
                            <h6>Dashboards</h6>
                        </Link>
                    </li>
                    <li className="sidebar-list">
                        <i className="fa-solid fa-thumbtack"></i>
                        <Link
                            className="sidebar-link"
                            to="#"
                            onClick={() => handleMenuClick('Service')}>
                            <svg className="stroke-icon">
                                <use href="../assets/svg/iconly-sprite.svg#Info-circle"></use>
                            </svg>
                            <h6 className="f-w-600">Service</h6>
                            {/* <i class="fa-solid fa-arrow-right"></i> */}
                        </Link>
                        {activeMenu === 'Service' && (
                            <ul className="sidebar-submenu">
                                <li><Link to="/service/main-category">Category</Link></li>
                                <li><Link to="/service/category">Subcategory</Link></li>
                                <li><Link to="/service/all-service">Service</Link></li>
                            </ul>
                        )}
                    </li>

                    <li className="sidebar-list">
                        <i className="fa-solid fa-thumbtack"></i>
                        <Link
                            className="sidebar-link"
                            to="#"
                            onClick={() => handleMenuClick('home-layout')}>
                            <svg className="stroke-icon">
                                <use href="../assets/svg/iconly-sprite.svg#Pie"></use>
                            </svg>
                            <h6 className="lan-2">Home Layout</h6>
                            {/* <i class="fa-solid fa-arrow-right"></i> */}
                        </Link>
                        {activeMenu === 'home-layout' && (
                            <ul className="sidebar-submenu">
                                <li><Link to="/home-layout/all-banner">Home Banner</Link></li>
                                <li><Link to="/home-layout/all-Offer-banner">Offer Banner</Link></li>
                                <li><Link to="/home-layout/all-faq-banner">FAQ Banner</Link></li>
                                <li><Link to="/home-layout/all-faq-content">FAQ Content</Link></li>
                                <li><Link to="/home-layout/all-marquee">Marquee</Link></li>
                                <li><Link to="/home-layout/all-blog">Blogs</Link></li>
                                <li><Link to="/home-layout/all-gallery-title">Gallery Title</Link></li>
                                <li><Link to="/home-layout/all-gallery-image">Gallery Image</Link></li>
                            </ul>
                        )}
                    </li>
                    <li className="sidebar-list">
                        <i className="fa-solid fa-thumbtack"></i>
                        <Link
                            className="sidebar-link"
                            to="/all-enquiry"
                           >
                            <svg className="stroke-icon">
                                <use href="../assets/svg/iconly-sprite.svg#Pie"></use>
                            </svg>
                            <h6 className="lan-2">All Enquiry</h6>
                        </Link>
                    </li>
                    <li className="sidebar-list">
                        <i className="fa-solid fa-thumbtack"></i>
                        <Link
                            className="sidebar-link"
                            to="/users/all-users"
                           >
                            <svg className="stroke-icon">
                                <use href="../assets/svg/iconly-sprite.svg#Pie"></use>
                            </svg>
                            <h6 className="lan-2">All User</h6>
                        </Link>
                    </li>
                    <li className="sidebar-list">
                        <i className="fa-solid fa-thumbtack"></i>
                        <Link
                            className="sidebar-link"
                            to="#"
                            onClick={() => handleMenuClick('vendors')}>
                            <svg className="stroke-icon">
                                <use href="../assets/svg/iconly-sprite.svg#Pie"></use>
                            </svg>
                            <h6 className="lan-2">Vendors</h6>
                            {/* <i class="fa-solid fa-arrow-right"></i> */}
                        </Link>
                        {activeMenu === 'vendors' && (
                            <ul className="sidebar-submenu">
                                <li><Link to="/vendors/all-membership-plan">Membership Plan</Link></li>
                                {/* <li><Link to="/vendors/add-vendor">Add Vendor</Link></li> */}
                                <li><Link to="/vendors/all-vendor">All Vendor</Link></li>
                            </ul>
                        )}
                    </li>
                    {/* <li className="sidebar-list">
                        <i className="fa-solid fa-thumbtack"></i>
                        <Link
                            className="sidebar-link"
                            to="/vendors/all-vendor"
                           >
                            <svg className="stroke-icon">
                                <use href="../assets/svg/iconly-sprite.svg#Pie"></use>
                            </svg>
                            <h6 className="lan-2">All Vendor</h6>
                        </Link>
                    </li> */}
                    <li className="sidebar-list">
                        <i className="fa-solid fa-thumbtack"></i>
                        <Link
                            className="sidebar-link"
                            to="/Orders/all-order"
                           >
                            <svg className="stroke-icon">
                                <use href="../assets/svg/iconly-sprite.svg#Pie"></use>
                            </svg>
                            <h6 className="lan-2">All Orders</h6>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>

    );
};

export default HederSlide;
