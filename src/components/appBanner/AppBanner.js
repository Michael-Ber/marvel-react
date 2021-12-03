import './appBanner.scss';
import avengers from '../../resourses/img/Avengers.png';
import avengersLogo from '../../resourses/img/Avengers_logo.png';

const AppBanner = () => {
    return (
        <div className="banner">
            <div className="banner-wrapper">
                <div className="banner-img-avengers img">
                    <img src={avengers} alt="avengers"/>
                </div>
                <div className="banner-text">
                    <span className="banner-title">New comics every week!</span>
                    <span className="banner-title">Stay tuned!</span>
                </div>
            </div>
            <div className="banner-img-avengers__logo img">
                <img src={avengersLogo} alt="avengers logo"/>
            </div>
        </div>
    )
}

export default AppBanner;