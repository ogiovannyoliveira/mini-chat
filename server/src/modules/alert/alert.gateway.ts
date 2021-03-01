import { WebSocketGateway, OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: '/alert' })
export class AlertGateway  implements OnGatewayInit {
  @WebSocketServer() wss: Server

  private logger: Logger = new Logger('AlertGateway')

  afterInit(server: any) {
    this.logger.log('Gateway initialized!')
  }
  
  sendToAll(message: string) {
    this.wss.emit('alertToClient', { type: 'Alert', message })
  }
}
