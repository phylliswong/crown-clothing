import { useState, useContext } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { UserContext } from "../../contexts/user.context";
import {
  createAuthUserFromEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  } 

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Error: passwords don't match");
      return;
    }

    try {
      const { user } = await createAuthUserFromEmailAndPassword(
        email,
        password,
      );

      await createUserDocumentFromAuth(user, { displayName });
      setCurrentUser(user);
      resetFormFields();
    } catch(error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log('Error creating user: ', error);
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setFormFields({ ...formFields, [name]: value });
  }


  return (
    <div className="sign-up-container">
      <h2>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form 
        className="sign-up-form"
        onSubmit={handleSubmit}
      >
        <FormInput
          label={"Display Name"}
          onChange={handleChange}
          required
          type="text"
          name={"displayName"}
          value={displayName}
        />
        <FormInput
          label={"Email"}
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label={"Password"} 
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
          label={"Confirm Password"}
          required
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUpForm;
