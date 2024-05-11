import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import React from "react";
export function AddItemButton({
  onClick,
}: {
  className?: string;
  onClick: () => void;
}) {
  return (
    <Button
      type='button'
      fullWidth
      onClick={onClick}
      variant='outlined'
      endIcon={<AddIcon />}
    >
      Add
    </Button>
  );
}
