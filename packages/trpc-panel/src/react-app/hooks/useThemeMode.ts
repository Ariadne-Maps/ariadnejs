import { useContext } from "react";
import { MuiContext } from "../components/contexts/MuiContext";

export const useThemeMode = () => useContext(MuiContext);
