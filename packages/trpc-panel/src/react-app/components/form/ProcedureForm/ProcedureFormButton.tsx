import React from "react";

import { ColorSchemeType } from "../../CollapsableSection";

import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
export function ProcedureFormButton({
  text,
  // colorScheme,
  loading,
}: {
  text: string;
  colorScheme?: ColorSchemeType;
  loading: boolean;
}) {
  return (
    <Button
      variant='contained'
      type='submit'
      className='relative  self-stretch justify-center'
      disabled={loading}
      endIcon={<SendIcon />}
    >
      {text}
    </Button>
  );
}
