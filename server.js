import fs from 'node:fs/promises'
import express from 'express'
import http from "http";
import { Server as IOServer } from "socket.io";
import userRouter from "./routes/user.js";

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 2220
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''
const ssrManifest = isProduction
  ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
  : undefined

// Create http server
const app = express();
const server = http.createServer(app);
const io = new IOServer(server, {
    cors: {
        origin: "http://localhost:2220",
    },
});

(async () => {
  const clients = new Set();

  io.on("connection", (socket) => {
    clients.add(socket.id);
    
    io.emit('new-client', clients.size);

    socket.on("staff-audio-stream", (data) => {
      socket.volatile.broadcast.emit("audio-stream", data);
    });

    socket.on("message", (data) => {
      io.emit("message", data);
    });

    socket.on('disconnect', () => {
      clients.delete(socket.id);
      io.emit('new-client', clients.size);
      io.emit("offline", `Listener with ID ${socket.id} left the stream.`);
    });
  });
  
  // express server
  
  // middlewares
  app.use(express.json());
 // app.use(cors({origin: 'http://localhost:5173'}));
  
  // routes
  app.use('/users', userRouter);
  
})();


// Add Vite or respective production middlewares
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}


// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }

    const rendered = await render(url, ssrManifest)

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
