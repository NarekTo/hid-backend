import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  // You can add more properties as needed

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}
