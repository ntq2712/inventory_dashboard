/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setFilter, type VehicleFilterState } from "../../store/vehicleFilterSlice";

const useVehicleFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector<RootState, VehicleFilterState>(
    (state) => state.vehicleFilter,
  );
  const [open, setOpen] = useState(false);

  const handleApply = useCallback(
    (values: any) => {
      // dispatch selected fields to the vehicle filter slice
      dispatch(
        setFilter({
          vin: values.vin ?? "",
          make: values.make ?? "",
          model: values.model ?? "",
          year: values.year ?? "",
          from_year: values.from_year ?? "",
          to_year: values.to_year ?? "",
          color: values.color ?? "",
          from_price:
            values.from_price !== undefined ? String(values.from_price) : "",
          to_price:
            values.to_price !== undefined ? String(values.to_price) : "",
        }),
      );
      setOpen(false);
    },
    [dispatch],
  );

  const onReset = useCallback(() => {
    dispatch(
      setFilter({
        vin: "",
        make: "",
        model: "",
        year: "",
        from_year: "",
        to_year: "",
        color: "",
        from_price: "",
        to_price: "",
      }),
    );
    setOpen(false);
  }, [dispatch]);

  const memoValues = useMemo(
    () => ({
      filters,
      open,
      setOpen,
      handleApply,
      onReset,
    }),
    [filters, handleApply, onReset, open, setOpen],
  );

  return memoValues;
};

export default useVehicleFilter;
