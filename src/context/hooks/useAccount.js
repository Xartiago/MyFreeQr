import { useContext } from "react";
import { context } from "../authContext";

export const useAccount = () => {
  const account = useContext(context)
  return account
}