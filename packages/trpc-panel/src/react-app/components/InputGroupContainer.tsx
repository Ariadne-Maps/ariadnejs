import React, { ReactNode } from "react";

export function InputGroupContainer({
  title,
  iconElement,
  children,
}: {
  title: string;
  iconElement?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      className={
        "flex flex-col border border-neutralSolid  rounded-md overflow-hidden shadow-sm"
      }
    >
      <span className='flex flex-row mb-1 p-1'>
        {iconElement} {title}
      </span>

      <div className={"space-y-2 flex-col flex p-1 "}>{children}</div>
    </div>
  );
}
