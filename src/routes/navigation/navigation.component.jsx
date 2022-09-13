import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnSvg } from "../../assets/crown.svg";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

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
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>sign out</span>
          ) : (
            <Link
              className="nav-signin"
              to="/auth">sign-in
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;
