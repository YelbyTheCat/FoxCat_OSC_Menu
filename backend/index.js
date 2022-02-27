import { readFile } from 'fs/promises';
import { Client, Server } from 'node-osc';
import { WebSocketServer } from 'ws';

//OSC Client
const oscClient = new Client('127.0.0.1', 9000);

//Connect to VRC for reading
var oscServer = new Server(9001, '127.0.0.1', () => {
  console.log('OSC Server is listening');
});

//Back to Front Talk
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
      console.log('received: %s', data);
      try 
      {
        const parse = JSON.parse(data);
        //Server to VRC
        if (typeof parse.address !== 'undefined' && typeof parse.value !== 'undefined') {
          oscClient.send(parse.address, parse.value);
        } 
      } catch (e) {
        // Do nothing if you can't parse it.
      }
    });

    //Print Message
    oscServer.on('message', async function (msg) {
      if  (msg[0] === '/avatar/change') {
        try {
          const data = await readFile(`avatarconfigs/${msg[1]}.json`, "utf8");
          const dataParsed = JSON.parse(data.replace(/^\uFEFF/, ''));
          ws.send(JSON.stringify({address: '/avatar/config', value: dataParsed}))
        } catch (e) {
          // Do nothing
        }
      }

      ws.send(JSON.stringify({address: msg[0], value: msg[1]}));
    });
});

const cleanup = () => {
  oscClient.close();
  oscServer.close();
  wss.close();
};

process.on('exit', cleanup);
process.on('SIGINT', cleanup);