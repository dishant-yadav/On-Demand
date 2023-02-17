import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Group,
  Center,
  Image,
} from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { emailRegex } from "../utils/regex";
import { signInWithEmailAndPassword } from "firebase/auth";
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

export default function Login() {
  const { classes } = useStyles();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={25}>
        <div
          style={{
            width: 260,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 40,
          }}
        >
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
          mb={50}
        >
          Welcome to OnDemand!
        </Title>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (
              !userData.email ||
              !userData.password ||
              !userData.email.match(emailRegex)
            ) {
              console.log("Error");
            } else {
              const data = {
                email: userData.email,
                password: userData.password,
              };
              signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                  const user = userCredential.user;
                  console.log("SignIn Successful");
                  navigate("/home");
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
          <Button fullWidth mt="xl" size="md" type="submit">
            Login
          </Button>
          <Text align="center" mt="lg">
            Don't have an account?<Link to={"/signup"}>Signup</Link>
          </Text>
        </form>
      </Paper>
    </div>
  );
}
