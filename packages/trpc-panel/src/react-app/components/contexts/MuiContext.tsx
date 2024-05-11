import React, { createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, type PaletteMode } from "@mui/material";
import palette from "../theme/palette";
type MuiContextType = {
  mode: PaletteMode;
  modeToggle: () => void;
};
const initialContext: MuiContextType = {
  mode: "dark",
  modeToggle: () => {},
};
export const MuiContext = createContext<MuiContextType>(initialContext);

const MuiContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = React.useState<PaletteMode>(initialContext.mode);
  const modeToggle = React.useCallback(() => {
    setMode((prevMode: PaletteMode) =>
      prevMode === "light" ? "dark" : "light"
    );
  }, []);
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: palette(mode),
      }),
    [mode]
  );
  return (
    <MuiContext.Provider value={{ mode, modeToggle }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>{children}</Box>
      </ThemeProvider>
    </MuiContext.Provider>
  );
};

export default MuiContextProvider;
