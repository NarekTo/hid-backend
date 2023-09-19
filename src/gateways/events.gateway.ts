import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket Initialized');
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected: ', client.id);
  }

  itemUpdated(item: any) {
    this.server.emit('itemUpdated', item);
  }
}