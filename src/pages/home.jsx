import React, { useEffect, useState } from "react";
import NavbarHome from "../components/navbarHome.jsx";
import { Box, Button, Text } from "@mantine/core";
import { getUser, getItems } from "./../utils/commonFunctions";
import { getDatabase, ref, onValue } from "firebase/database";
import ItemGrid from "../components/itemsGrid.jsx";

export default function Home() {
  const db = getDatabase();

  const [userDetails, setUserDetails] = useState({
    id: "",
    name: "",
    email: "",
    photoURL: "",
  });

  const [items, setItems] = useState([
    {
      id: "",
      itemName: "",
      itemDesc: "",
      itemPrice: 0,
      itemImageURL: "",
      rating: [],
      metaData: {
        createdAt: {
          date: "",
          time: "",
        },
        demanderDetails: {
          demanderID: "",
          demanderName: "",
          demanderEmail: "",
          demanderPhoto: "",
        },
      },
    },
  ]);

  const getUserDetails = async () => {
    const { uid: id, displayName: name, email, photoURL } = await getUser();
    setUserDetails({
      id,
      name,
      email,
      photoURL,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      getUserDetails();
    }, 1000);
  }, []);

  return (
    <Box>
      <NavbarHome userDetails={userDetails} />
      <Text
        variant="text"
        sx={{
          fontFamily: "Ubuntu, sans-serif",
          paddingInline: 40,
        }}
        ta="left"
        fz={30}
        fw={500}
      >
        Welcome {userDetails.name || "User"} {"🖐"}
      </Text>
      <ItemGrid />
    </Box>
  );
}
