import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import { MessagingService } from "./messaging.service";
import { CreateMessagingDto } from "./dto/create-messaging.dto";


@WebSocketGateway()
export class MessagingGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
@WebSocketServer()
server : Server

constructor(
    private readonly messagesService : MessagingService){}

afterInit(server: Server) {
    console.log('Websocket server initialized')
}
handleConnection(client: Socket) {
    console.log('client connected')
}
handleDisconnect(client: Socket) {
    console.log('client disconnected')
}

@SubscribeMessage('sendMessage')
async handleMessage(@MessageBody() createMessageDto: CreateMessagingDto, @ConnectedSocket() client: Socket) { 
    const message = await this.messagesService.create(createMessageDto); 
    this.server.emit('receiveMessage', message);
}
} 