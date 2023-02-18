import {
  createStyles,
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
  Box,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

export default function ItemCard({ items }) {
  const { classes } = useStyles();

  const cards = items.map((item) => (
    <Card
      key={item.id}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image
          src={
            item.itemImageURL ||
            "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
          }
        />
      </AspectRatio>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {item.metaData.createdAt.date}
      </Text>
      <Text className={classes.title} mt={5}>
        {item.itemName}
      </Text>
    </Card>
  ));

  return (
    <Box py="xl">
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: "sm", cols: 2 }]}>
        {cards}
      </SimpleGrid>
    </Box>
  );
}
