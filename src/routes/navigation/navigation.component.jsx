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
            <Link className="nav-link" to="/shop">shop</Link>
            <Link className="nav-link" to="/contact">contact</Link>
          </div>
          <Link className="nav-signin" to="/auth">sign in</Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;
