import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, PaginatedResponse } from '../interfaces/paginated-response.interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T> | PaginatedResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T> | PaginatedResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        // If data is already a paginated response, return as is
        if (data && typeof data === 'object' && 'meta' in data && 'data' in data) {
          return data as PaginatedResponse<T>;
        }

        // For regular responses, wrap in standard format
        return {
          success: true,
          data,
          message: 'Request successful',
        } as ApiResponse<T>;
      }),
    );
  }
}
