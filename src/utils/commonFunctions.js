import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const db = getDatabase();

export const getUser = async () => {
  const auth = await getAuth();
  const currentUser = auth?.currentUser;
  return currentUser; 
};

export const getItems = async () => {
  let data = [];
  const itemsRef = await ref(db, "/items");
  await onValue(itemsRef, (snapshot) => {
    data = snapshot.val();
  });
  return data;
};
