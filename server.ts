import blitz from "blitz/custom-server";
import { createServer } from "http";
import { parse } from "url";
import { log } from "@blitzjs/display";
import { initIO, setupRoomsOnConnection } from "io";

const { PORT = "3000" } = process.env;
const dev = process.env.NODE_ENV !== "production";
const app = blitz({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const io = initIO();
  io.attach(server);
  setupRoomsOnConnection(io);

  server.listen(PORT, () => {
    log.success(`Ready on http://localhost:${PORT}`);
  });
});
