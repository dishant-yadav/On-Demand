import { useContext, useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Text,
  Autocomplete,
  Avatar,
  ActionIcon,
  Modal,
  useMantineTheme,
  TextInput,
  Button,
  FileInput,
  NumberInput,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconSearch, IconUpload } from "@tabler/icons-react";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { getDatabase, ref, set } from "firebase/database";
import { AuthProvider } from "./../config/authContext";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    background: "green",
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export default function NavbarHome({ userDetails }) {
  const db = getDatabase();

  const postItems = async (itemName, itemDesc, itemPrice) => {
    const todayDate = new Date();
    const itemID = Math.random().toString().slice(2);
    set(ref(db, "items/" + itemID), {
      id: itemID,
      itemName,
      itemDesc,
      itemPrice,
      rating: [],
      metaData: {
        createdAt: {
          date: todayDate.toDateString(),
          time: todayDate.toTimeString(),
        },
        demanderDetails: {
          demanderID: userDetails.id,
          demanderName: userDetails.name,
          demanderEmail: userDetails.email,
          demanderPhoto: userDetails.photoURI || "ImageLink",
        },
      },
    });
  };

  const [openedMenu, { toggle }] = useDisclosure(false);
  const [opened, { close, open }] = useDisclosure(false);
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const form = useForm({
    initialValues: {
      itemName: "",
      ItemDesc: "",
      itemImage: new File(["", ""], ""),
      itemPriceExp: 0,
    },
    validate: {
      itemName: hasLength(
        { min: 2, max: 20 },
        "Name must be 2-10 characters long"
      ),
      itemName: isNotEmpty("Name cannot be blank"),
      ItemDesc: hasLength(
        { min: 2, max: 60 },
        "Description must be 2-60 characters long"
      ),
      ItemDesc: isNotEmpty("Description cannot be blank"),
      itemPriceExp: (value) =>
        value <= 0 ? "Item Price should be greater than 0" : null,
    },
  });

  return (
    <AuthProvider>
      <Header height={60} mb={10}>
        <Modal
          centered
          opened={opened}
          onClose={close}
          size="md"
          title="Add your Demand"
          overlayColor={
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2]
          }
          overlayOpacity={0.55}
          overlayBlur={6}
        >
          <form
            onSubmit={form.onSubmit(() => {
              postItems(
                form.values.itemName,
                form.values.ItemDesc,
                form.values.itemPriceExp
              );
              close();
              form.reset();
            })}
          >
            <TextInput
              label="Name"
              description="What name you would like the item to be known as?"
              placeholder="Medicine"
              withAsterisk
              {...form.getInputProps("itemName")}
            />
            <TextInput
              mt="md"
              label="Description"
              description="How would you like to describe the item?"
              placeholder="Color : Red || Length: 90cm"
              withAsterisk
              {...form.getInputProps("ItemDesc")}
            />
            <FileInput
              mt={"md"}
              multiple
              label="Item Images (PNG/JPEG)"
              description="Some images of the item?"
              placeholder="Items Image"
              icon={<IconUpload size={14} />}
              {...form.getInputProps("itemImage")}
              accept="image/png,image/jpeg"
            />
            <NumberInput
              mt="md"
              label="Excepted Price (in ₹)"
              description="What should be the starting price?"
              placeholder="1000"
              withAsterisk
              {...form.getInputProps("itemPriceExp")}
              hideControls={true}
            />
            <Button
              variant="filled"
              type="submit"
              mt={"md"}
              sx={{ float: "right" }}
            >
              Submit
            </Button>
          </form>
        </Modal>
        <Box className={classes.header}>
          <Text
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            sx={{ fontFamily: "Greycliff CF, sans-serif" }}
            ta="center"
            fz="xl"
            fw={700}
          >
            OnDemand
          </Text>
          <Autocomplete
            className={classes.search}
            placeholder="Search Items"
            icon={<IconSearch color="grey" size={15} />}
            data={[
              "React",
              "Angular",
              "Vue",
              "Next.js",
              "Riot.js",
              "Svelte",
              "Blitz.js",
            ]}
          />
          <Group>
            <Avatar color="blue" radius="xl" sx={{ cursor: "pointer" }}>
              {userDetails.name.at(0) || "U"}
            </Avatar>
            <ActionIcon
              variant="filled"
              sx={{ cursor: "pointer" }}
              onClick={open}
            >
              <IconPlus size={16} />
            </ActionIcon>
          </Group>
          <Burger
            opened={openedMenu}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
        </Box>
      </Header>
    </AuthProvider>
  );
}
