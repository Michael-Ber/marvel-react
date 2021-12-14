import {Link, NavLink} from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="header">
            <h2 className="header__main">
                <Link to="/" className="header__main-link">
                    <span>Marvel</span> information portal
                </Link>
            </h2>
            <h2 className="header__pages">
                <NavLink end to="/" className={({isActive}) => "header__pages-link" + (isActive ? " header__pages-link_active": "")} >Characters</NavLink>
                /
                <NavLink to="/comics" className={({isActive}) => "header__pages-link" + (isActive ? " header__pages-link_active": "")}>Comics</NavLink>
            </h2>
        </header>
    )
}

export default AppHeader;