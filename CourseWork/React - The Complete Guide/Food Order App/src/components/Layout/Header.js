import { Fragment } from "react";

import mealsImage from "../../assets/meals.JPG";
import classes from "./Header.module.css";
import HeaderCardButton from "./HeaderCartButton";

const Header = props => {
    return <Fragment>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCardButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img alt="meals on table" src={mealsImage}/>
        </div>
    </Fragment>
};

export default Header;