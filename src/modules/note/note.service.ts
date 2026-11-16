import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service.js';
import type { CreateNoteDto } from './dto/create-note.dto.js';

export type Note = {
  id: string;
  title: string;
  createdAt: Date;
};

const insertNote = `
  INSERT INTO notes (id, title)
  VALUES ($1, $2)
  RETURNING id, title, created_at AS "createdAt"
`;

const selectNotes = `
  SELECT id, title, created_at AS "createdAt"
  FROM notes
  ORDER BY created_at DESC
`;

@Injectable()
export class NoteService {
  constructor(private readonly database: DatabaseService) {}

  async create(dto: CreateNoteDto): Promise<Note> {
    const rows = await this.database.query<Note>(insertNote, [
      randomUUID(),
      dto.title,
    ]);
    const note = rows[0];

    if (!note) {
      throw new Error('Failed to create note');
    }

    return note;
  }

  findAll(): Promise<Note[]> {
    return this.database.query<Note>(selectNotes);
  }
}
