import React from "react";
import { FormSection } from "./FormSection";
import { JsonViewer } from "@textea/json-viewer";
import prettyBytes from "pretty-bytes";
import prettyMs from "pretty-ms";
import { useTheme } from "@mui/material/styles";

export function Response({
  children,
  size,
  time,
}: {
  children: string | object;
  size?: number;
  time?: number;
}) {
  const { palette } = useTheme();
  const title = size
    ? time
      ? `Response (${prettyBytes(size)}, ${prettyMs(time)})`
      : `Response (${prettyBytes(size)})`
    : time
    ? `Response (${prettyMs(time)})`
    : `Response`;

  if (typeof children === "object") {
    return (
      <FormSection title={title}>
        <JsonViewer
          theme={palette.mode}
          rootName={false}
          style={{
            backgroundColor: palette.background.paper,
            color: palette.text.primary,
          }}
          // sx={(theme) => {
          //   return {
          //     backgroundColor: theme.palette.background.paper,
          //     color: theme.palette.text.primary,
          //   };
          // }}
          displayDataTypes={false}
          value={children}
          quotesOnKeys={false}
        />
      </FormSection>
    );
  }

  return (
    <FormSection title={title}>
      <p className="font-mono whitespace-pre-wrap break-words">{children}</p>
    </FormSection>
  );
}
