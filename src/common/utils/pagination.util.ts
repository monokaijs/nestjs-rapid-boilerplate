import { Model, Document, FilterQuery } from 'mongoose';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedResponse, PaginationMeta } from '../interfaces/paginated-response.interface';

export class PaginationUtil {
  static async paginate<T extends Document>(
    model: Model<T>,
    paginationDto: PaginationDto,
    filter: FilterQuery<T> = {},
    populate?: string | string[],
  ): Promise<PaginatedResponse<T>> {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = paginationDto;

    // Build search filter
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter = {
        ...filter,
        $or: [
          { firstName: searchRegex },
          { lastName: searchRegex },
          { email: searchRegex },
        ],
      };
    }

    // Calculate skip
    const skip = (page - 1) * limit;

    // Build sort object
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    // Execute queries
    const [data, total] = await Promise.all([
      model
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate(populate || '')
        .exec(),
      model.countDocuments(filter).exec(),
    ]);

    // Calculate pagination meta
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const meta: PaginationMeta = {
      page,
      limit,
      total,
      totalPages,
      hasNextPage,
      hasPrevPage,
    };

    return {
      data,
      meta,
      success: true,
    };
  }
}
