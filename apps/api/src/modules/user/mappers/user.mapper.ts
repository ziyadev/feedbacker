import { UserEntity } from '../entities/user.entity';
import { UserModel } from '../models/user.model';

export class UserMapper {
  static toModel(entity: UserEntity): UserModel {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      emailVerified: entity.emailVerified,
      avatar: entity.avatar,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
