import { createStyles, Card, Image, Text, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";

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
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

export default function ItemCard({ item }) {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Card
      withBorder
      p="lg"
      className={classes.card}
      sx={{ cursor: "pointer" }}
      onClick={() => {
        console.log(item.itemName);
        navigate(`/item/${item.id}`, { state: item });
      }}
    >
      <Card.Section>
        <Image src={"image"} alt={"title"} height={100} />
      </Card.Section>

      <Group position="apart" mt="xl">
        <Text size="sm" weight={700} className={classes.title}>
          {item.itemName}
        </Text>
        <Group spacing={5}>
          <Text size="xs" color="dimmed">
            {item.itemPrice}
          </Text>
        </Group>
      </Group>
      <Text mt="sm" mb="md" color="dimmed" size="xs">
        {item.itemDesc}
      </Text>
    </Card>
  );
}
