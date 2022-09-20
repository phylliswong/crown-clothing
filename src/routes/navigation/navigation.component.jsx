import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { signOutUser } from '../../utils/firebase/firebase.utils';
import { selectCurrentUser } from "../../store/user/user.selector";

import { ReactComponent as CrwnSvg } from "../../assets/crown.svg";
import { CartContext } from "../../contexts/cart.context";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { LogoContainer,
  NavigationContainer,
  NavLinks,
  NavLink
} from "./navigation.styles";

// import './navigation.styles.scss';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);

  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnSvg className="logo"/>
        </LogoContainer>
        
        <NavLinks>
            <NavLink to="/shop">shop</NavLink>
            <NavLink to="/contact">contact</NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>sign out</NavLink>
          ) : (
            <NavLink
              className="nav-signin"
              to="/auth">sign-in
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;
