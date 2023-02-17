import { Anchor, MantineProvider, Text } from "@mantine/core";
import Hero from "./pages/hero";

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Hero />
    </MantineProvider>
  );
}
