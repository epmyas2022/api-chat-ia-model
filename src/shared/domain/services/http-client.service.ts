import { Injectable } from '@/shared/dependencies/injectable';

@Injectable()
export abstract class HttpClientService {
  abstract get<T>(url: string, params?: Record<string, unknown>): Promise<T>;
  abstract post<T>(url: string, data?: Record<string, unknown>): Promise<T>;
  abstract put<T>(url: string, data?: Record<string, unknown>): Promise<T>;
  abstract delete<T>(url: string, params?: Record<string, unknown>): Promise<T>;
}
