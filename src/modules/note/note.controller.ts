import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { NoteService, type Note } from './note.service.js';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Body() dto: CreateNoteDto): Promise<Note> {
    return this.noteService.create(dto);
  }

  @Get()
  findAll(): Promise<Note[]> {
    return this.noteService.findAll();
  }
}
