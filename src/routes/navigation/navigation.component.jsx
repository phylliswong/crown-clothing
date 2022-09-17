import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnSvg } from "../../assets/crown.svg";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { LogoContainer,
  NavigationContainer,
  NavLinks,
  NavLink
} from "./navigation.styles";

// import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
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
