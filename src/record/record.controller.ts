import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import UpdatePaymentInfoDto from './dto/update-payment-info.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import {AuthGuard} from "@nestjs/passport";

@Controller('records')
@UseGuards(AuthGuard('jwt'))
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordService.create(createRecordDto);
  }

  @Get()
  findAll() {
    return this.recordService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const record = await this.recordService.findOne(+id);

    if (!record) {
      throw new NotFoundException('Record not found');
    }

    return record;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecordDto: UpdateRecordDto) {
    return this.recordService.update(+id, updateRecordDto);
  }

  @Put(':id')
  async updatePaymentInfo(
    @Param('id') id: string,
    @Body() updatePaymentInfoDto: UpdatePaymentInfoDto,
  ) {
    try {
      return await this.recordService.updatePaymentInfo(
        +id,
        updatePaymentInfoDto,
      );
    } catch (err) {
      throw new NotFoundException('Record not found');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    try {
      await this.recordService.remove(+id);
    } catch (err) {
      throw new NotFoundException('Record not found');
    }
  }
}
