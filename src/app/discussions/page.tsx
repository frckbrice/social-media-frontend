"use client";
import { getAllRooms, getAllUsers } from "@/utils/service/queries";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";

const BackgroundImage = () => {
  const { setChatRooms, setCurrentUser, currentUser, setAllUsers } =
    useAppContext();
  const router = useRouter();
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

    setTimeout(() => {
      setCurrentUser(JSON.parse(localStorage.getItem("sender") || "{}"));
    }, 1000);
  }, []);

  return (
    <div className="flex items-center justify-center h-full ">
      <div
        className="bg-center bg-cover w-full h-full"
        style={{ backgroundImage: "url('/whatsappdashbord.png')" }}
      ></div>
    </div>
  );
};

export default BackgroundImage;
