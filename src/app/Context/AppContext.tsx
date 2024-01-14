"use client";
import {
  getAllGroups,
  getAllRooms,
  getAllUsers,
  getCurrentUser,
} from "@/utils/service/queries";
import { LOCAL_STORAGE } from "@/utils/service/storage";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface DataType {
  currentUser: Room;
  setCurrentUser: Dispatch<SetStateAction<Room>>;
  showAllUserscontacts: boolean;
  setShowAllUsercontacts: Dispatch<SetStateAction<boolean>>;
  allUsers: Room[];
  setAllUsers: Dispatch<SetStateAction<Room[]>>;
  chatRooms: Room[];
  setChatRooms: Dispatch<SetStateAction<Room[]>>;
  allGroups: Room[];
  setAllGroups: Dispatch<SetStateAction<Room[]>>;
}

const initialState: DataType = {
  currentUser: {
    id: "",
    name: "",
    email: "",
    phone: "",
    image: "",
    my_id: "",
    user_id: "",
  },
  showAllUserscontacts: false,
  setShowAllUsercontacts: (showAllcontacts) => !showAllcontacts,
  setCurrentUser: () => {},
  allUsers: [],
  setAllUsers: () => [],
  chatRooms: [],
  setChatRooms: () => [],
  allGroups: [],
  setAllGroups: () => [],
};

const AppContext = createContext<DataType>(initialState);
// export default AppContext;

export const AppContextProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<Room>(
    initialState.currentUser
  );
  const [allUsers, setAllUsers] = useState<Room[]>([]);
  const [chatRooms, setChatRooms] = useState<Room[]>([]);
  const [allGroups, setAllGroups] = useState<Room[]>([]);
  const [showAllUserscontacts, setShowAllUsercontacts] =
    useState<boolean>(false);

  const values = {
    currentUser,
    setCurrentUser,
    allUsers,
    setAllUsers,
    chatRooms,
    setChatRooms,
    allGroups,
    setAllGroups,
    showAllUserscontacts,
    setShowAllUsercontacts,
  };

  useEffect(() => {
    getAllUsers().then((res) => {
      setAllUsers(res);
      // console.log(res);
    });

    // Get all chats rooms
    console.log(currentUser.user_id);
    getAllRooms(currentUser.user_id).then((res) => {
      console.log("theses are chat rooms", res);
      setChatRooms(res);
    });

    setCurrentUser(JSON.parse(localStorage.getItem("sender") || "{}"));
  }, [currentUser.user_id]);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
