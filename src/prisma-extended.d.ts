import { PrismaClient } from '@prisma/client';

interface ExtendedPrismaClient extends PrismaClient {
  $on(event: 'beforeExit', callback: () => void): void;
}

export { ExtendedPrismaClient };
