const WebSocketServer = new require("ws");

const wss = new WebSocketServer.Server({ port: 8080 });

let clients = []; // ulegnie wyczyszczeniu po restarcie serwera

wss.on("connection", (ws) => {
  let id = clients.length; // 0,1,2,3,4
  clients[id] = ws;
  console.log(`Nowe połączenie #${id}`);
  clients[id].send(`Cześć, zostałeś numerem ${id}`); // wysyłamy event do clienta
  // wysyłkę do pozostałych klientów
});

// wss.on("close");
