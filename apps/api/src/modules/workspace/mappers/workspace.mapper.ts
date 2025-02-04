import { WorkspaceEntity } from '../entity/workspace.entity';
import { WorkspaceModel } from '../model/workspace.model';

export class UserMapper {
  static toModel(entity: WorkspaceEntity): WorkspaceModel {
    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      description: entity.description,
      avatar: entity.avatar,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
