import { useRouteError } from "react-router-dom";
import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
  Anchor,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colors[theme.primaryColor][3],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,
    color: theme.white,
    marginTop: 40,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 540,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colors[theme.primaryColor][1],
  },
}));

export default function ServerError() {
  const error = useRouteError();
  console.error("Error : ", error);
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>Oops.. .</Title>
        <Text size="lg" align="center" className={classes.description}>
          {error.statusText || error.message}
        </Text>
        <Text size="lg" align="center" className={classes.description}>
          Sorry an unexpected error has occured
        </Text>
        <Text></Text>
        <Group position="center">
          <Anchor href="/"> Return to Home</Anchor>
        </Group>
      </Container>
    </div>
  );
}
