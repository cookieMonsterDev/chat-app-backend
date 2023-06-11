import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from '../message/entities/message.entity';

@WebSocketGateway(9999, { cors: '*' })
export class ChatRoomGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const chatId = client.handshake.query.chatId as string;
    client.join(chatId);
  }

  handleDisconnect(client: Socket) {
    const chatId = client.handshake.query.chatId as string;
    client.leave(chatId);
  }
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: Message) {
    const chatId = client.handshake.query.chatId as string;
    const savedMessage = 'test'; // async func should return message
    this.server.to(chatId).emit('message', savedMessage);
  }
}
