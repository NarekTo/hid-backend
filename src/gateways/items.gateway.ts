import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway(3002, { cors: { origin: 'http://localhost:3001' } })
export class ItemsGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('Items WebSocket Initialized');
  }
  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('itemUpdated')
  handleItemUpdated(client: any, payload: any): void {
    // Broadcast the updated item to all connected clients
    this.server.emit('itemUpdated', payload);
  }

  @SubscribeMessage('itemDeleted')
  handleItemDeleted(client: any, payload: any): void {
    // Broadcast the deleted item ID to all connected clients
    this.server.emit('itemDeleted', payload);
  }

  @SubscribeMessage('itemAdded')
  handleItemAdded(client: any, payload: any): void {
    // Broadcast the added item to all connected clients
    this.server.emit('itemAdded', payload);
  }
}
