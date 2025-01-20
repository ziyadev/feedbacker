import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  IsArray,
  ArrayMaxSize,
  IsUrl,
} from 'class-validator';
import { FeedbackType } from '../entities/feedback.entity';

export class CreateFeedbackDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(900)
  message: string;

  @IsNotEmpty()
  @IsEnum(FeedbackType)
  type: FeedbackType;

  @IsUrl()
  url: string;

  @IsArray()
  @ArrayMaxSize(50)
  screenshotUrls: string[];

  @IsArray()
  @ArrayMaxSize(50)
  tags: string[];
}
