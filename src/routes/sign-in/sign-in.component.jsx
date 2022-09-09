import {
  signInWithGooglePopup,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';


import { Outlet } from "react-router-dom"

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <Outlet />
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>
        Sign in with Google Popup
      </button>
    </div>
  );
}

export default SignIn;
