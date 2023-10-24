//src/auth/entity/auth.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  job_title_code: string;

  @ApiProperty()
  department_code: string;

  @ApiProperty()
  app_password: string;

  @ApiProperty()
  app_privileges: string;

  @ApiProperty()
  accessToken: string;
}
