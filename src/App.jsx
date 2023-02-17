import { Anchor, MantineProvider, Text } from "@mantine/core";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Text>Welcome to OnDemand!</Text>
      <Link to={"/signup"}>SignUp</Link>
      <Link to={"/login"}>Login</Link>
    </MantineProvider>
  );
}
