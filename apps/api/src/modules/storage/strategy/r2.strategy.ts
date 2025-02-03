import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { IStorage } from '../storage.interface';
@Injectable()
export class R2Strategy implements IStorage {
  private readonly r2: S3Client;
  private readonly bucketName: string;

  constructor() {
    this.r2 = new S3Client({
      region: 'auto',

      endpoint:
        'https://42da76e088f427474e48e7285d15667e.r2.cloudflarestorage.com',
      credentials: {
        accessKeyId: 'e0a377003c9f03cc3989178ed75ca958',
        secretAccessKey:
          '5d46283f1cf40f91c03adddea373af353053504e2c82d9d066b077b2c14f34ba',
      },
    });
    this.bucketName = 'fbtemp';
  }

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    await this.r2.send(command);
  }

  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    return getSignedUrl(this.r2, command, { expiresIn });
  }

  async getUploadSignedUrl(
    fileKey: string,
    fileType: string,
    expiresIn: number,
    metadata?: Record<string, string>
  ): Promise<string> {
    const uniqueFileName = `temp/${uuid()}-${fileKey}.${
      fileType.split('/')[1]
    }`;
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: uniqueFileName,
      ContentType: fileType,
      ACL: 'public-read',
      Metadata: metadata,
    });

    return getSignedUrl(this.r2, command, { expiresIn });
  }
}
