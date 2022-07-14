import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { isNull } from 'lodash';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((_, value) => !isNull(value))
  @IsUUID('4')
  artistId: string | null;

  @ValidateIf((_, value) => !isNull(value))
  @IsUUID('4')
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
