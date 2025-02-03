import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

enum FileType {
  IMAGE_PNG = 'image/png',
  IMAGE_JPEG = 'image/jpeg',
  IMAGE_GIF = 'image/gif',
  VIDEO_MP4 = 'video/mp4',
  VIDEO_WEBM = 'video/webm',
}
registerEnumType(FileType, {
  name: 'FileType',
});

@InputType()
export class GetPresignedUrlDto {
  @Field(() => FileType)
  mimeType: FileType;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  fileName: string;
}
