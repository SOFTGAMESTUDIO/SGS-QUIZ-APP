import { collection, doc, setDoc, getDocs, runTransaction, Timestamp } from "firebase/firestore";
import { fireDB } from "../DataBase/firebaseConfig"; // Adjust the import path as needed

// Generate roll number starting from 250001
const generateRollNumber = async () => {
  const snapshot = await getDocs(collection(fireDB, "users"));
  return 250001 + snapshot.size;
};

// Save user data in Firestore
export const addUserToFirestore = async (user, formData = null) => {
  const rollNumber = await generateRollNumber();

  // If formData exists → email/password signup
  // Otherwise → social login (Google/GitHub)
  const userData = {
    uid: user.uid,
    email: user.email,
    name: formData
      ? `${formData.firstName} ${formData.lastName}`.trim()
      : user.displayName || "No Name",
    phone: formData?.phone || "",

    rollNumber,
    address: {
      houseno: "",
      streetno: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
    time: Timestamp.now(),
  };

  const userRef = doc(fireDB, "users", user.uid);
  await setDoc(userRef, userData);
};
