import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase_init";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth/cordova";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth/web-extension";

export const authContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const provider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userLoginWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const updateUserProfile = updatedData => {
    return updateProfile(auth.currentUser, updatedData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    return () => {
        unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    createUser,
    userLogin,
    userLoginWithGoogle,
    logOut,
    updateUserProfile,
  };

  return <AuthProvider.Provider value={authInfo}>{ children }</AuthProvider.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};

export default AuthProvider;
