import React, { ReactNode, useState } from "react";
import { RouterContainer } from "./components/RouterContainer";
import type { ParsedRouter } from "../parse/parseRouter";
import { RenderOptions } from "@src/render";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import {
  HeadersContextProvider,
  useHeaders,
} from "@src/react-app/components/contexts/HeadersContext";
import { useLocalStorage } from "@src/react-app/components/hooks/useLocalStorage";
import { HeadersPopup } from "@src/react-app/components/HeadersPopup";
import { Toaster } from "react-hot-toast";
import { SiteNavigationContextProvider } from "@src/react-app/components/contexts/SiteNavigationContext";
import { SideNav } from "./components/SideNav";
import { TopBar } from "./components/TopBar";
import superjson from "superjson";
import { AllPathsContextProvider } from "@src/react-app/components/contexts/AllPathsContext";
import { HotKeysContextProvider } from "@src/react-app/components/contexts/HotKeysContext";
import { SearchOverlay } from "@src/react-app/components/SearchInputOverlay";
import MuiContextProvider from "./components/contexts/MuiContext";
import { Box, Container } from "@mui/material";

export function RootComponent({
  rootRouter,
  options,
  trpc,
}: {
  rootRouter: ParsedRouter;
  options: RenderOptions;
  trpc: ReturnType<typeof createTRPCReact>;
}) {
  return (
    <HeadersContextProvider>
      <MuiContextProvider>
        <AllPathsContextProvider rootRouter={rootRouter}>
          <SiteNavigationContextProvider>
            <ClientProviders trpc={trpc} options={options}>
              <HotKeysContextProvider>
                <SearchOverlay>
                  <div className="flex flex-col w-full h-full flex-1 relative">
                    <AppInnards rootRouter={rootRouter} />
                  </div>
                </SearchOverlay>
              </HotKeysContextProvider>
            </ClientProviders>
          </SiteNavigationContextProvider>
        </AllPathsContextProvider>
      </MuiContextProvider>
    </HeadersContextProvider>
  );
}

function ClientProviders({
  trpc,
  children,
  options,
}: {
  trpc: ReturnType<typeof createTRPCReact>;
  children: ReactNode;
  options: RenderOptions;
}) {
  const headers = useHeaders();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: options.url,
          headers: headers.getHeaders,
        }),
      ],
      transformer: (() => {
        if (options.transformer === "superjson") return superjson;
        return undefined;
      })(),
    })
  );
  const [queryClient] = useState(() => new QueryClient());

  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}

function AppInnards({ rootRouter }: { rootRouter: ParsedRouter }) {
  const [sidebarOpen, setSidebarOpen] = useLocalStorage(
    "trpc-panel.show-minimap",
    true
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          position: "relative",
          width: "100%",
        }}
      >
        <TopBar open={sidebarOpen} setOpen={setSidebarOpen} />
        <Box sx={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <SideNav
            rootRouter={rootRouter}
            open={sidebarOpen}
            setOpen={setSidebarOpen}
          />
          <Box
            sx={{
              maxHeight: "calc(100vh - 4rem)",
              display: "flex",
              flexDirection: "column",
              flex: 1,
              overflow: "scroll",
            }}
          >
            <Container sx={{ pt: 8, p: 4 }} className="  max-w-6xl">
              <RouterContainer router={rootRouter} />
            </Container>
          </Box>
        </Box>
        <HeadersPopup />
        <Toaster />
      </Box>
    </Box>
  );
}
