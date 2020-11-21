import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../../shared/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message])
  ],
})

export class MessageModule {}
