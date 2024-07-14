import React from 'react';
import { Link } from 'react-router-dom';
import {
    BsCart3, 
    BsGrid1X2Fill, 
    BsFillArchiveFill, 
    BsFillGrid3X3GapFill, 
    BsPeopleFill, 
    BsListCheck, 
    BsMenuButtonWideFill, 
} from 'react-icons/bs';
import '../dist/home.css';

import { FaCircleInfo } from "react-icons/fa6";

function Sidebar({ openSidebarToggle, OpenSidebar, isAuthenticated, onLogout }) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <BsCart3 className='icon_header' /> LivingCozy
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <Link to={"/"}>
                        <BsGrid1X2Fill className='icon' /> Dashboard
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to={"/product"}>
                        <BsFillArchiveFill className='icon' /> Products
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to={"/category"}>
                        <BsFillGrid3X3GapFill className='icon' /> Categories
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to={"/customers"}>
                        <BsPeopleFill className='icon' /> Customers
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to={"/transaction"}>
                        <BsListCheck className='icon' /> Transaction
                    </Link>
                </li>
                {/* <li className='sidebar-list-item'>
                    <Link to={"/reports"}>
                        <BsMenuButtonWideFill className='icon' /> Reports
                    </Link>
                </li> */}
                <li className='sidebar-list-item'>
                    <Link to={"/info"}>
                        <FaCircleInfo className='icon' /> Information
                    </Link>
                </li>
                {isAuthenticated && (
                    <li className='sidebar-list-item' onClick={onLogout}>
                        <span>
                            <BsFillArchiveFill className='icon' /> Logout
                        </span>
                    </li>
                )}
            </ul>
        </aside>
    );
}

export default Sidebar;
