import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationDto => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;

    const paginationDto = new PaginationDto();
    
    // Parse page
    if (query.page) {
      const page = parseInt(query.page, 10);
      if (!isNaN(page) && page > 0) {
        paginationDto.page = page;
      }
    }

    // Parse limit
    if (query.limit) {
      const limit = parseInt(query.limit, 10);
      if (!isNaN(limit) && limit > 0 && limit <= 100) {
        paginationDto.limit = limit;
      }
    }

    // Parse search
    if (query.search && typeof query.search === 'string') {
      paginationDto.search = query.search.trim();
    }

    // Parse sortBy
    if (query.sortBy && typeof query.sortBy === 'string') {
      paginationDto.sortBy = query.sortBy;
    }

    // Parse sortOrder
    if (query.sortOrder && (query.sortOrder === 'asc' || query.sortOrder === 'desc')) {
      paginationDto.sortOrder = query.sortOrder;
    }

    return paginationDto;
  },
);
