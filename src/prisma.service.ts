import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ExtendedPrismaClient } from './prisma-extended';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    (this as ExtendedPrismaClient).$on('beforeExit', async () => {
      await app.close();
    });
  }
}
