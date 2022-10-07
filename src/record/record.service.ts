import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Record } from './entities/record.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import UpdatePaymentInfoDto from './dto/update-payment-info.dto';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private recordsRepository: Repository<Record>,
  ) {}

  async create(createRecordDto: CreateRecordDto): Promise<Record> {
    const record = new Record();
    record.description = createRecordDto.description;
    record.type = createRecordDto.type;
    record.amount = createRecordDto.amount;
    record.reference = new Date(createRecordDto.reference);
    record.paid = false;

    return await this.recordsRepository.save(record);
  }

  async findAll(): Promise<Record[]> {
    return await this.recordsRepository.find();
  }

  async findOne(id: number): Promise<Record> {
    return await this.recordsRepository.findOneBy({ id });
  }

  async update(id: number, updateRecordDto: UpdateRecordDto): Promise<Record> {
    const record = new Record();
    record.description = updateRecordDto.description;
    record.type = updateRecordDto.type;
    record.amount = updateRecordDto.amount;
    record.reference = new Date(updateRecordDto.reference);
    record.paid = updateRecordDto.paid;

    return await this.recordsRepository.save(record);
  }

  async updatePaymentInfo(
    id: number,
    updatePaymentInfoDto: UpdatePaymentInfoDto,
  ): Promise<Record> {
    const record = await this.recordsRepository.findOneByOrFail({ id });
    record.paid = updatePaymentInfoDto.paid;

    return await this.recordsRepository.save(record);
  }

  async remove(id: number): Promise<void> {
    const record = await this.recordsRepository.findOneBy({ id });

    if (!record) {
      throw new Error('Record not found');
    }

    await this.recordsRepository.remove(record);
  }
}
