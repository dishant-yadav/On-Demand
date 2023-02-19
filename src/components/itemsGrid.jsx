import {
  createStyles,
  SimpleGrid,
  Card,
  Image,
  Text,
  Box,
  Group,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import ItemCard from "./itemCard";

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

export default function ItemGrid() {
  const { classes } = useStyles();
  const [items, setItems] = useState([]);

  const db = getDatabase();
  const itemsRef = ref(db, "items");

  useEffect(() => {
    onValue(itemsRef, (data) => {
      setItems(Object.values(data.val()));
    });
  }, []);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <Box py="xl" sx={{ backgroundColor: "wheat", width: "100%" }}>
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {items.map((item) => {
          return <ItemCard key={item.id} item={item} />;
        })}
      </SimpleGrid>
    </Box>
  );
}
