import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Export GET and POST handlers for uploadthing
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
