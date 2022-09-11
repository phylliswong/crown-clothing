import { Outlet } from "react-router-dom";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";


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
      <SignUpForm />
    </div>
  );
}

export default SignIn;
