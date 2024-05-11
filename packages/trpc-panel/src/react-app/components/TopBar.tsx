import React from "react";
import { useHeadersContext } from "@src/react-app/components/contexts/HeadersContext";
import MailLockIcon from "@mui/icons-material/MailLockOutlined";
import { LogoSvg } from "@src/react-app/components/LogoSvg";
import { useIsMac } from "@src/react-app/components/hooks/useIsMac";
import { Chevron } from "@src/react-app/components/Chevron";
import Search from "@mui/icons-material/Search";
import { useSearch } from "@src/react-app/components/contexts/SearchStore";
import { Box, Button, IconButton } from "@mui/material";
import ThemeSwitcher from "./ThemeSwitcher";

export function TopBar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setHeadersPopupShown } = useHeadersContext();
  return (
    <Box
      className='w-full px-4 pr-8 flex flex-row justify-between items-center position-fixed left-0 h-16 right-0 top-0  drop-shadow-sm '
      sx={{
        // left: 0,
        // height: "4rem",
        // right: 0,
        // top: 0,
        // boxShadow: 1,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box className='flex flex-row items-center gap-4'>
        <IconButton
          type='button'
          role='button'
          onClick={() => setOpen((prev) => !prev)}
          aria-label='Toggle sidebar'
          aria-pressed={open}
        >
          {open ? (
            <Chevron className='w-4 h-4  ' direction='left' />
          ) : (
            <Chevron className='w-4 h-4' direction='right' />
          )}
        </IconButton>
        <Box
          component='span'
          className='flex flex-row items-center text-lg font-bold font-mono'
        >
          <LogoSvg className='rounded-lg w-10 h-10 mr-2' />
          tRPC.panel()
        </Box>
      </Box>
      <RouterSearchTooltip />
      <Box>
        <ThemeSwitcher />
        <Button
          onClick={() => setHeadersPopupShown(true)}
          className='border border-neutralSolidTransparent py-2 px-4  font-bold rounded-sm shadow-sm'
        >
          Headers
          <MailLockIcon className='w-6 h-6 ml-1' />
        </Button>
      </Box>
    </Box>
  );
}

// import Search from '@mui/icons-material/Search'
export function RouterSearchTooltip() {
  const searchOpen = useSearch((s) => s.searchOpen);
  const setSearchOpen = useSearch((s) => s.setSearchOpen);

  const isMac = useIsMac();
  const helperText = isMac ? "⌘ + P" : "Ctrl + P";
  if (searchOpen) return null;
  return (
    <Button
      onClick={() => setSearchOpen(true)}
      type='button'
      className='flex flex-row items-center'
      startIcon={
        <Search
          fontSize='small'
          className='mr-2 color-neutralSolidTransparent'
        />
      }
    >
      {helperText}
    </Button>
  );
}
