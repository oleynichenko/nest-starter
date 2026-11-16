import { ServiceUnavailableException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DatabaseService } from '../database/database.service.js';
import { HealthService } from './health.service.js';

describe('HealthService', () => {
  let service: HealthService;

  const database = {
    query: vi.fn<(sql: string, values?: unknown[]) => Promise<unknown[]>>(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: DatabaseService,
          useValue: database as unknown as DatabaseService,
        },
      ],
    }).compile();

    service = module.get(HealthService);
  });

  it('returns ok when the database answers', async () => {
    database.query.mockResolvedValue([{ '?column?': 1 }]);

    await expect(service.check()).resolves.toEqual({ status: 'ok' });
    expect(database.query).toHaveBeenCalledWith('SELECT 1');
  });

  it('returns unavailable when the database query fails', async () => {
    database.query.mockRejectedValue(new Error('connection refused'));

    await expect(service.check()).rejects.toBeInstanceOf(
      ServiceUnavailableException,
    );
  });
});
