import { getStorage } from "firebase/storage";
import { app } from "./config";

/* Storage service */
export const storage = getStorage(app)