import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly pool: Pool;

  constructor(configService: ConfigService) {
    this.pool = new Pool({
      connectionString: configService.getOrThrow<string>('DATABASE_URL'),
    });

    this.pool.on('error', (error: Error) => {
      console.error('Database pool error:', error.message);
    });
  }

  async query<T>(text: string, values: unknown[] = []): Promise<T[]> {
    const result = await this.pool.query(text, values);
    return result.rows as T[];
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}
