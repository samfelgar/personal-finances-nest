import { IsBoolean } from 'class-validator';

export default class UpdatePaymentInfoDto {
  @IsBoolean()
  paid: boolean;
}
