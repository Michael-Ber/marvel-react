import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="header">
            <h2 className="header__main">
                <a href="#" className="header__main-link">
                    <span>Marvel</span> information portal
                </a>
            </h2>
            <h2 className="header__pages">
                <a href="#" className="header__pages-link header__pages-link_active">Characters</a>
                /
                <a href="#" className="header__pages-link">Comics</a>
            </h2>
        </header>
    )
}

export default AppHeader;