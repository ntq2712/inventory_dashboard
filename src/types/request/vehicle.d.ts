interface VehicleFilter {
  pageIndex?: number;
  pageSize?: number;
  status?: string;
  searchText?: string;
  vin?: string;
  make?: string;
  model?: string;
  from_year?: string;
  to_year?: string;
  color?: string;
  from_price?: string;
  to_price?: string;
}
