import {
  Title,
  Text,
  Container,
  Button,
  Overlay,
  createStyles,
  BackgroundImage,
  Box,
} from "@mantine/core";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 220,
    paddingBottom: 130,
    minHeight: "92vh",
    "@media (max-width: 520px)": {
      paddingTop: 80,
      paddingBottom: 50,
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: "center",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: "center",

    "@media (max-width: 520px)": {
      fontSize: theme.fontSizes.md,
      textAlign: "left",
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 1.5,
    display: "flex",
    justifyContent: "center",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    height: 42,
    fontSize: theme.fontSizes.md,

    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: "rgba(255, 255, 255, .4)",

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, .45) !important",
    },
  },
}));

export default function Hero() {
  const { classes, cx } = useStyles();

  return (
    <Box>
      <BackgroundImage src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80">
        <Navbar />
        <div className={classes.wrapper}>
          <Title className={classes.title}>
            Get your demand{" "}
            <Text component="span" inherit className={classes.highlight}>
              fulfilled
            </Text>
          </Title>

          <Container size={640}>
            <Text size="lg" className={classes.description}>
              Build more reliable software with AI companion. AI is also trained
              to detect lazy developers who do nothing and just complain on
              Twitter.
            </Text>
          </Container>

          <div className={classes.controls}>
            <Button
              className={cx(classes.control, classes.secondaryControl)}
              size="lg"
            >
              <Link to={"/signup"} style={{ textDecoration: "none" }}>
                SignUp
              </Link>
            </Button>
            <Button className={classes.control} variant="white" size="lg">
              <Link to={"/login"} style={{ textDecoration: "none" }}>
                Login
              </Link>
            </Button>
          </div>
        </div>
      </BackgroundImage>
    </Box>
  );
}
