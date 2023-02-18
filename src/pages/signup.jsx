import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Image,
} from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { nameRegex, emailRegex } from "../utils/regex";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 710,
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 710,
    maxWidth: 650,
    paddingTop: 10,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function SignUp() {
  const { classes } = useStyles();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const navigate = useNavigate();

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={25}>
        <div style={{ width: 260, marginLeft: "auto", marginRight: "auto" }}>
          <Image
            radius="md"
            src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            alt="Random unsplash image"
          />
        </div>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={10}
        >
          Welcome to OnDemand!
        </Title>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (
              !userData.email ||
              !userData.name ||
              !userData.cPassword ||
              !userData.password ||
              !userData.email.match(
                emailRegex || !userData.name.match(nameRegex)
              ) ||
              !userData.password.length > 6 ||
              userData.password !== userData.cPassword
            ) {
              console.log("Error");
            } else {
              const data = {
                name: userData.name,
                email: userData.email,
                password: userData.password,
              };
              createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                  const user = userCredential.user;
                  console.log("Account Created");
                  return user;
                })
                .then((user) => {
                  updateProfile(user, {
                    displayName: data.name,
                  });
                  console.log("Name Updated");
                  navigate("/login");
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log("Failure");
                  console.log(errorCode);
                  console.log(errorMessage);
                });
            }
          }}
        >
          <TextInput
            type={"text"}
            label="Name"
            placeholder="John Doe"
            size="md"
            value={userData.name}
            onChange={(e) => {
              setUserData({
                ...userData,
                name: e.currentTarget.value,
              });
            }}
          />
          <TextInput
            type={"email"}
            label="Email address"
            placeholder="johndoe@gmail.com"
            size="md"
            mt="md"
            value={userData.email}
            onChange={(e) => {
              setUserData({
                ...userData,
                email: e.currentTarget.value,
              });
            }}
          />
          <PasswordInput
            label="Password"
            placeholder="At least 6 characters"
            mt="md"
            size="md"
            value={userData.password}
            onChange={(e) => {
              setUserData({
                ...userData,
                password: e.currentTarget.value,
              });
            }}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter the password"
            mt="md"
            size="md"
            value={userData.cPassword}
            onChange={(e) => {
              setUserData({
                ...userData,
                cPassword: e.currentTarget.value,
              });
            }}
          />

          <Button
            mt="lg"
            size="md"
            type="submit"
            sx={{ float: "right", clear: "both" }}
          >
            SignUp
          </Button>
          <Text align="center" mt={70}>
            Already have an account? <Link to={"/login"}>Login</Link>
          </Text>
        </form>
      </Paper>
    </div>
  );
}
