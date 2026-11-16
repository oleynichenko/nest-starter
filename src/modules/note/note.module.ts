import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module.js';
import { NoteController } from './note.controller.js';
import { NoteService } from './note.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
