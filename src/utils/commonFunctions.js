import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const db = getDatabase();

export const getUser = async () => {
  const auth = await getAuth();
  const currentUser = auth?.currentUser;
  return currentUser;
};

export const getItems = () => {
  const itemsRef = ref(db, "/items");
  const data = onValue(itemsRef, (snapshot) => {
    return snapshot.val();
  });
  return [Object.values(data)];
};

const getItemDetails = () => {
  let data = [];
  const itemsRef = ref(db, "/items");
  onValue(itemsRef, (snapshot) => {
    data = snapshot.val();
    setItems([...Object.values(items)]);
  });
};
