import React, { useState } from "react";
// import { ChevronIcon } from "../../icons/ChevronIcon";
import ChevronIcon from "@mui/icons-material/ChevronRight";
import { Box } from "@mui/material";
export function StackTrace({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={(theme) => ({
        border: `1px solid ${theme.palette.divider}`,
      })}
      className='flex flex-col  rounded-md  overflow-hidden shadow-sm'
    >
      <button
        className='flex flex-row items-center  p-4 rounded-t-md justify-between font-bold'
        onClick={() => setOpen((val) => !val)}
        type='button'
      >
        Stack Trace
        <ChevronIcon className={"ml-2 w-4 h-4 " + (!open ? "" : "rotate-90")} />
      </button>
      {open && (
        <div className='max-h-64 p-4 overflow-scroll whitespace-pre '>
          {text}
        </div>
      )}
    </Box>
  );
}
