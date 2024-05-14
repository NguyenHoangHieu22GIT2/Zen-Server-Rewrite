import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ConversationId } from 'src/common/types/utilTypes';

@WebSocketGateway({ namespace: '/chat', cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer() server: Server;

  // Handle connection
  public handleConnection(client: any) {
    console.log('Client connected:', client.id);
  }

  // Handle disconnection
  public handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }

  public joinConversation(conversationId: ConversationId) {}

  // Add other methods to handle events if needed
}
