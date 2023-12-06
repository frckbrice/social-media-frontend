"use client";
import { ContainerProps } from "postcss";
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
};

const AppContext = createContext<DataType>(initialState);
export default AppContext;
