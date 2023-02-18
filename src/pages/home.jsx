import React, { useEffect, useState } from "react";
import NavbarHome from "../components/navbarHome.jsx";
import { getAuth } from "firebase/auth";
import { Text } from "@mantine/core";
import { getDatabase, ref, onValue } from "firebase/database";

export default function Home() {
  const auth = getAuth();
  const db = getDatabase();
  const itemsDB = ref(db, "ratings/454");

  useEffect(() => {
    onValue(itemsDB, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  });

  if (auth.currentUser) {
    const { displayName, email } = auth.currentUser;
    console.log(auth?.currentUser?.email);
  }

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    photoURI: "",
  });

  return (
    <div>
      <NavbarHome />
    </div>
  );
}
