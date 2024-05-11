import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@/lib/trpc/routers/_app";
import { createContext } from "@/lib/trpc/context";
// export API handler
// @link https://trpc.io/docs/server/adapters
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
