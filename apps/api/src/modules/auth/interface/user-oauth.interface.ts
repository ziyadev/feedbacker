import { UserEntity } from '@/modules/user/entities/user.entity';

export interface UserOauthEntity extends UserEntity {
  isNew: boolean;
}
