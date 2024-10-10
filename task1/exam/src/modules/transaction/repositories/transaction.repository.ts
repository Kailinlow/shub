import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TransactionEntity } from '../entities/transaction.entity';

@Injectable()
export class TransactionRepository extends Repository<TransactionEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TransactionEntity, dataSource.createEntityManager());
  }

  async getLatestTransactions(
    start: Date,
    end: Date,
  ): Promise<TransactionEntity[]> {
    const latestTransactions = await this.createQueryBuilder('transaction')
      .where('transaction.time >= :start', { start })
      .andWhere('transaction.time <= :end', { end })
      .andWhere(
        'transaction.createdAt = ' +
          this.createQueryBuilder()
            .select('MAX(createdAt)')
            .where('time >= :start AND time <= :end', { start, end })
            .getQuery(),
      )
      .getMany();

    return latestTransactions;
  }
}
