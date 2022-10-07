import { IsDateString, IsIn, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRecordDto {
  @IsNotEmpty()
  @IsIn(['revenue', 'debt'])
  type: 'revenue' | 'debt';

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsDateString()
  reference: string;
}
