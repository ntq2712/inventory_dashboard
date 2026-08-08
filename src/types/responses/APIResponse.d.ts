interface APIResponse<T> {
  status: number;
  success: boolean;
  data: T;
  message: string;
  totalRows?: number;
}
