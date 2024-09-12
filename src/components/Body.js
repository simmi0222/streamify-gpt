import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import Watch from "./Watch";

const Body = () => {
  // npm i -D react-router-dom
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/watch",
      element: <Watch />,
    }
  ]);

  // navigate("/") in Else-part will give an Error i.e this navigate() should be written inside some child component of Body(i.e Header/Browse) & not in the Body component
  // OR the 'appRouter' should have been put at the App level i.e in App.js
  // SOLUTION - written this code of useEffect() in unsubscribe part of 'Header.js' and inside updateProfile() in .then of 'Login.js'

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in/up
  //       // const uid = user.uid;
  //       const { uid, email, displayName } = user;
  //       dispatch(
  //         addUser({
  //           uid: uid,
  //           email: email,
  //           displayName: displayName,
  //         })
  //       );
  //       navigate("/browse");
  //     } else {
  //       // User is signed out
  //       dispatch(removeUser());
  //       navigate("/");          // Error = useNavigate() may be used only in the context of a <Router> component
  // SOLUTION - Can Use this navigate() in Login.js
  //     }
  //   });
  // });

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default Body;
