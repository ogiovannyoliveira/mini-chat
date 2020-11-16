import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server

  private logger: Logger = new Logger('ChatGateway')

  afterInit(server: any) {
    this.logger.log('Gateway initialized!')
  }

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: { sender: string, message: string }): void {
    this.wss.emit('chatToClient', message)
  }
}
