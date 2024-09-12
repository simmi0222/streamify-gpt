import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // console.log(name) & then, name.current.value
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return; // return only if there is any string(i.e error) other than null
    // Else - Sign Up/In  Logic
    if (!isSignInForm) {
      // Sign Up Logic - Copy 'Web modular API' inside Firebase_DOCS->Build->Web->Password_Authentication
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // console.log(user);

          // from DOCS->Build->Web->ManageUsers->updateProfile
          updateProfile(user, {
            // user = auth.currentUser
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              // navigate("/browse") , this will not update displayName & photoURL in Store
              const { uid, email, displayName, photoURL } = auth.currentUser; // auth.currentUser will fetch details from the updated value of user
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code; // i.e. auth/email-already-in-use
          const errorMessage = error.message; // i.e. Firebase: Error (auth/email-already-in-use)
          setErrorMessage(errorCode);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
          // navigate("/browse")  onAuthStateChanged will handle this
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode);
          // setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="">
      <Header />

      <div className="absolute">
        <img
          className="h-screen w-screen no-scrollbar object-cover"
          src={BG_URL}
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-11/12 md:w-3/12 absolute p-10 bg-black my-28 md:my-24 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {/* For Sign Up */}
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            required
            placeholder="Full Name"
            className="p-4 my-2 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          required
          placeholder="Email Address"
          className="p-4 my-2 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          required
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-sm ">{errorMessage}</p>
        <button
          className="p-3 my-4 bg-red-700 w-full rounded-lg text-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-1 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Streamify? Sign Up Now."
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};
export default Login;
