import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../UI/button/MyButton";
import {AuthContext} from "../../context";

const Navbar = () => {
    const {setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className="navbar">
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <div className="navbar__links">
                <Link to="/about">
                    <MyButton>О сайте</MyButton>
                </Link>
                <Link style={{marginLeft: 15}} to="/posts">
                    <MyButton>Посты</MyButton>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;