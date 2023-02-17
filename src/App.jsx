import { Anchor, MantineProvider, Text } from "@mantine/core";

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Text>Welcome to OnDemand!</Text>
      <Anchor href="/signup">SignUp</Anchor>
    </MantineProvider>
  );
}
