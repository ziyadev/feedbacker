import { WorkspaceEntity } from '../entity/workspace.entity';

export class WorkspaceBuilder {
  private workspace: WorkspaceEntity;

  constructor() {
    this.workspace = {} as WorkspaceEntity;
  }

  setName(name: string): WorkspaceBuilder {
    this.workspace.name = name;
    return this;
  }

  setSlug(slug: string): WorkspaceBuilder {
    this.workspace.slug = slug;
    return this;
  }

  setDescription(description: string): WorkspaceBuilder {
    this.workspace.description = description;
    return this;
  }

  setAvatar(avatar: string): WorkspaceBuilder {
    this.workspace.avatar = avatar;
    return this;
  }

  build(): WorkspaceEntity {
    return this.workspace;
  }
}
