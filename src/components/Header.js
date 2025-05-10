import React, { useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faHome } from "@fortawesome/free-solid-svg-icons";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";
import lang from "../constants/languageConstants";
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //SignIn/SignUp
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
        //signOut
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const handleGPTSearch = () => {
    dispatch(toggleGPTSearchView());
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between">
      <img className="w-32 h-20" src={LOGO} alt="Netflix_Logo" />
      {user && (
        <div className="flex p-2 gap-[6px] flex-col items-center">
          <div className="flex justify-between gap-4">
            <button
              className="bg-orange-500 text-white hover:bg-orange-600 rounded-md h-12 w-40 font-semibold"
              onClick={handleGPTSearch}
            >
              <FontAwesomeIcon
                icon={!showGPTSearch ? faFilm : faHome}
                className="mr-2"
              />
              {!showGPTSearch ? "Movie Recommendation" : lang[langKey]?.home}
            </button>
            {showGPTSearch && (
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((language) => (
                  <option key={language?.id} value={language?.id}>
                    {language?.name}
                  </option>
                ))}
              </select>
            )}
            <img className="w-12 h-12" src={user?.photoURL} alt="user_icon" />
            <button
              className="bg-red-500 text-white hover:bg-red-600 rounded-md h-12 w-24 font-semibold"
              onClick={handleSignOut}
            >
              {lang[langKey]?.signOut}
            </button>
          </div>
          <p className="text-white text-s">
          {lang[langKey]?.hello}, <span className="text-xl">{user.displayName ?? "User"}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
