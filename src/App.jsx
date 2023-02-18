import { Anchor, MantineProvider, Text } from "@mantine/core";
import { AuthProvider } from "./config/authContext";
import Hero from "./pages/hero";

export default function App() {

  return (
    <AuthProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Hero />
      </MantineProvider>
    </AuthProvider>
  );
}
