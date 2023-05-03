import { IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName: string = null;

  @IsOptional()
  @IsString()
  lastName: string = null;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  bio: string = null;

  @IsOptional()
  @IsString()
  avatarUrl: string = null;
}
