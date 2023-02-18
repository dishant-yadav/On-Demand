import React, { useEffect, useState } from "react";
import NavbarHome from "../components/navbarHome.jsx";
import { Text } from "@mantine/core";
import { AuthProvider } from "../config/authContext.jsx";

export default function Home() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    photoURI: "",
  });

  return (
    <AuthProvider>
      <NavbarHome />
    </AuthProvider>
  );
}
