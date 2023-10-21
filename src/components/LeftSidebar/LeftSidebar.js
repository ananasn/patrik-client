import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import classnames from "classnames";

import './LeftSidebar.scss';

import NavList from '../NavList/NavList';
import NavMenu from '../NavMenu/NavMenu';
import Profile from '../ProfileLink/Profile';

const LeftSidebar = () => {
  const isDay = useSelector((state) => state.isDay);
  return (
    <div className={classnames("left-sidebar", {
      'left-sidebar_day': isDay,
      'left-sidebar_night': !isDay,
    })}>
      
      <Profile/>
      <NavMenu/>
      <NavList/>
    </div>
  );
};

export default LeftSidebar;
