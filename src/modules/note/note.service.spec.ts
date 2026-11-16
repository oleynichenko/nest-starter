import { Test } from '@nestjs/testing';
import { DatabaseService } from '../../database/database.service.js';
import { NoteService, type Note } from './note.service.js';

describe('NoteService', () => {
  let service: NoteService;

  const database = {
    query: vi.fn<(sql: string, values?: unknown[]) => Promise<unknown[]>>(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module = await Test.createTestingModule({
      providers: [
        NoteService,
        {
          provide: DatabaseService,
          useValue: database as unknown as DatabaseService,
        },
      ],
    }).compile();

    service = module.get(NoteService);
  });

  it('creates a note with a parameterized insert', async () => {
    const created: Note = {
      id: 'note-id',
      title: 'Example note',
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
    };
    database.query.mockResolvedValue([created]);

    await expect(service.create({ title: 'Example note' })).resolves.toEqual(
      created,
    );

    expect(database.query).toHaveBeenCalledOnce();
    const [sql, values] = database.query.mock.calls[0] ?? [];
    expect(sql).toContain('INSERT INTO notes');
    expect(sql).toContain('$1');
    expect(sql).toContain('$2');
    expect(sql).not.toContain('Example note');
    expect(values?.[0]).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    expect(values?.[1]).toBe('Example note');
  });

  it('returns notes newest first', async () => {
    const notes: Note[] = [];
    database.query.mockResolvedValue(notes);

    await expect(service.findAll()).resolves.toEqual(notes);

    const [sql, values] = database.query.mock.calls[0] ?? [];
    expect(sql).toContain('FROM notes');
    expect(sql).toContain('ORDER BY created_at DESC');
    expect(values).toBeUndefined();
  });

  it('fails when the insert returns no row', async () => {
    database.query.mockResolvedValue([]);

    await expect(service.create({ title: 'Example note' })).rejects.toThrow(
      'Failed to create note',
    );
  });
});
