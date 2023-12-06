"use client";
import { getAllUsers, getCurrentUser } from "@/utils/service/queries";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface DataType {
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
  allUsers: [];
  setAllUsers: Dispatch<SetStateAction<[]>>;
}

const initialState: DataType = {
  currentUser: {
    id: "",
    name: "",
    email: "",
    createdAt: "",
    updatedAt: "",
  },
  setCurrentUser: () => {},
  allUsers: [],
  setAllUsers: () => [],
};

const AppContext = createContext<DataType>(initialState);
// export default AppContext;

export const AppContextProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User>(
    initialState.currentUser
  );
  const [allUsers, setAllUsers] = useState<[]>([]);

  const values = {
    currentUser,
    setCurrentUser,
    allUsers,
    setAllUsers,
  };

  useEffect(() => {
    getAllUsers().then((res) => {
      setAllUsers(res);
      console.log(res);
    });

    getCurrentUser().then((res) => {
      setCurrentUser(res);
      console.log(res);
    });
  }, []);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
