import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @ApiProperty({ required: false })
  username?: string;

  @IsEmail()
  @ApiProperty({ required: false })
  email?: string;

  @IsString()
  @ApiProperty({ required: false })
  password?: string;

  // You can add more properties as needed
}
