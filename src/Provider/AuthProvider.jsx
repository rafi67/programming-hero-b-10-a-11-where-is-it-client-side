import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase_init";
import PropTypes from "prop-types";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth/cordova";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = 'http://localhost:5000/';

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

  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const email = currentUser.email;
        const user = { email: email };
        axios.post(`${url}jwt`, user, { withCredentials: true }).then(() => {
          setLoading(false);
        });
      } else {
        axios
          .post(
            url+"logout",
            {},
            {
              withCredentials: true,
            }
          )
          .then(() => {
            setLoading(false);
          });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setUser,
    setLoading,
    createUser,
    userLogin,
    userLoginWithGoogle,
    logOut,
    updateUserProfile,
    url,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};

export default AuthProvider;
