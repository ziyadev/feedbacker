import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GetPresignedUrlDto } from './dto/get-presigned-url.dto';
import { StorageService } from './storage.service';
@Resolver()
export class StorageResolver {
  constructor(private readonly storageService: StorageService) {}

  @Mutation(() => String)
  getUploadPresignedUrl(@Args('input') input: GetPresignedUrlDto) {
    return this.storageService.r2.getUploadSignedUrl(
      `${Date.now()}`,
      input.mimeType,
      3600,
      {
        'Content-Type': input.mimeType,
        'File-Name': input.fileName,
      }
    );
  }
}
