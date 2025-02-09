import { Injectable } from '@nestjs/common';

@Injectable()
export class CursorService {
  createCursorObject(cursor: any): any {
    if (!cursor) {
      return;
    }
    return {
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
      skip: cursor ? 1 : 0,
    };
  }

  createCursor<T>(item: T): string | null {
    return item?.['id'] ?? null;
  }

  createPaginationResponse<T>(
    list: T[],
    orderByKey: string,
    take: number,
    totalCount: number,
    mapper: (item: T) => any
  ) {
    if (list.length === 0) {
      return {
        totalCount: 0,
        hasNextPage: false,
        startCursor: null,
        endCursor: null,
        edges: [],
        nodes: [],
      };
    }

    const hasNextPage = list.length > take;
    if (hasNextPage) {
      list.pop(); // Remove extra item fetched for `hasNextPage` check
    }

    return {
      totalCount,
      hasNextPage,
      startCursor: this.createCursor(list[0]),
      endCursor: this.createCursor(list[list.length - 1]),
      edges: list.map((item) => ({
        cursor: this.createCursor(item),
        node: mapper(item),
      })),
      nodes: list.map((item) => mapper(item)),
    };
  }
}
