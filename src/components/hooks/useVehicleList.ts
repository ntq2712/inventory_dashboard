import { useState } from "react";
import endpoint from "../../apis/endpointConfig";
import { vehiclesApi } from "../../apis/vehicles";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import type { VehicleFilterState } from "../../store/vehicleFilterSlice";

const useVehicleList = () => {
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filters = useSelector<RootState, VehicleFilterState>((state) => state.vehicleFilter);

  console.log("filters: ", filters)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [endpoint.vehicles.list, currentPage, pageSize, filters],
    queryFn: () =>
      vehiclesApi.getVehicles({
        pageIndex: currentPage - 1,
        pageSize: pageSize,
        status: undefined,
        searchText: filters.searchText || undefined,
        vin: filters.vin || undefined,
        make: filters.make || undefined,
        model: filters.model || undefined,
        color: filters.color || undefined,
        from_price: filters.from_price || undefined,
        to_price: filters.to_price || undefined,
        from_year: filters.from_year || undefined,
        to_year: filters.to_year || undefined,
      }),
    select: (response) => response.data,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    isFilterOpen,
    setIsFilterOpen,
    filters,
  };
};

export default useVehicleList;
