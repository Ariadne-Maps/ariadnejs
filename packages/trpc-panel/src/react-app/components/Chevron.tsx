import React from "react";
import { ChevronIcon } from "@src/react-app/components/icons/ChevronIcon";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronUpIcon from "@mui/icons-material/ExpandLess";
import ChevronDownIcon from "@mui/icons-material/ExpandMore";
export function Chevron({
  className,
  direction,
}: {
  className?: string;
  direction: "up" | "down" | "right" | "left";
}) {
  switch (direction) {
    case "up":
      return <ChevronUpIcon className={className} />;
    case "down":
      return <ChevronDownIcon className={className} />;
    case "right":
      return <ChevronRightIcon className={className} />;
    case "left":
      return <ChevronLeftIcon className={className} />;
    default:
      return (
        <ChevronIcon
          className={
            className +
            " " +
            `${(() => {
              switch (direction) {
                case "up":
                  return " -rotate-[270deg]";
                case "down":
                  return "-rotate-90";
                case "right":
                  return "rotate-180";
                case "left":
                  return "";
              }
            })()}`
          }
        />
      );
  }
}
