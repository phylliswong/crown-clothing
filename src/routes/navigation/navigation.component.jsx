import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnSvg } from "../../assets/crown.svg";
import './navigation.styles.scss';

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnSvg className="logo"/>
        </Link>
        
        <div className="nav-links-container">
          <div className="nav-links">
            <Link className="nav-link" to="/shop">SHOP</Link>
            <Link className="nav-link" to="/contact">Contact</Link>
          </div>
          <Link className="nav-login" to="/login">Login</Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;
