import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // navigate("/");  onAuthStateChanged will handle this
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    // from DOCS->Build->Web->ManageUsers->onAuthStateChanged
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in/up
        // const uid = user.uid;
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  // Toggle GPT Search
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    // in configSlice.js
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen md:px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-start md:justify-between">
      <img className="w-44 mx-auto my-3 md:mx-0 md:my-3" src={LOGO} alt="logo" />
      {/* show this Only if user is present i.e on Browse page */}
      {user && (
        <div className="flex p-2 justify-between"> 
          {showGptSearch && (
            // show this(GptSearch Component) Only if GptSearch is clicked
            <select
              className="p-2 m-2 border-none bg-slate-200 rounded-md"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="py-2 px-4 mx-4 my-2 bg-red-700 text-white font-bold rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
          <button onClick={handleSignOut} className="font-bold text-white ">
            (Sign Out)
          </button>
          <img
            className="hidden md:block w-9 h-9 mt-2 rounded-sm justify-center"
            alt="usericon"
            src={user?.photoURL}
          />
        </div>
      )}
    </div>
  );
};
export default Header;
