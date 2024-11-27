import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagingService } from './messaging.service';
import { CreateMessagingDto } from './dto/create-messaging.dto';

@WebSocketGateway()
export class MessagingGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagingService) {}

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() createMessageDto: CreateMessagingDto, @ConnectedSocket() client: Socket) {
    try {
      console.log('Received message:', createMessageDto);
      console.log("saving the message")
      const message = await this.messagesService.create(createMessageDto);
      this.server.emit('receiveMessage', message);
      console.log('Message sent to all clients:', message);
    } catch (error) {
        console.log('saving message failed')
      console.error('Error handling message:', error);
    }
  }
}
