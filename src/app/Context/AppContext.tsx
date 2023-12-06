"use client";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
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

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
