import { Injectable } from '@nestjs/common';
import { IStorage } from './storage.interface';
import { R2Strategy } from './strategy/r2.strategy';

@Injectable()
export class StorageService {
  get r2(): IStorage {
    return new R2Strategy();
  }
}
