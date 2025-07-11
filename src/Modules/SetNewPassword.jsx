// app/Library/resetWithEmail.js
import { auth, sendPasswordResetEmail } from "../DataBase/firebaseConfig";

export async function sendResetPasswordEmail(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
}
