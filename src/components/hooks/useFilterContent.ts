/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { Form } from "antd";
import moment from "moment-timezone";
import { useCallback, useEffect, useMemo } from "react";
import { vehiclesApi } from "../../apis/vehicles";
import type { VehicleFilterState } from "../../store/vehicleFilterSlice";

const useFilterContent = (
  initialValues: VehicleFilterState,
  onApply: (values: any) => void,
) => {
  const [form] = Form.useForm();
  const selectedMake = Form.useWatch<string | undefined>("make", form);
  const currentMake = selectedMake ?? initialValues.make;

  useEffect(() => {
    form.setFieldsValue({
      vin: initialValues.vin || undefined,
      make: initialValues.make || undefined,
      model: initialValues.model || undefined,
      color: initialValues.color || undefined,
      year:
        initialValues.from_year && initialValues.to_year
          ? [
              moment().year(Number(initialValues.from_year)),
              moment().year(Number(initialValues.to_year)),
            ]
          : undefined,
      from_price: initialValues.from_price
        ? Number(initialValues.from_price)
        : undefined,
      to_price: initialValues.to_price
        ? Number(initialValues.to_price)
        : undefined,
    });
  }, [form, initialValues]);

  const hasInitialValues = Boolean(
    initialValues &&
    Object.values(initialValues).some((v) => v !== undefined && v !== ""),
  );

  const { data: makeData } = useQuery<
    { value: string; label: string }[],
    Error
  >({
    queryKey: ["vehicleMakes"],
    queryFn: async () => {
      const response = await vehiclesApi.getMakes();
      return response.data.data;
    },
    staleTime: Infinity,
  });

  const { data: modelData } = useQuery<string[], Error>({
    queryKey: ["vehicleModels", currentMake],
    queryFn: async () => {
      const response = await vehiclesApi.getModelsByMake(currentMake ?? "");
      return response.data.data;
    },
    enabled: Boolean(currentMake),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!currentMake) {
      form.setFieldsValue({ model: undefined });
    }
  }, [currentMake, form]);

  const submit = useCallback(async () => {
    const values = await form.validateFields();
    const fromPrice = values.from_price ?? "";
    const toPrice = values.to_price ?? "";
    if (
      fromPrice !== "" &&
      toPrice !== "" &&
      Number(fromPrice) > Number(toPrice)
    ) {
      return;
    }

    const yearRange = values.year || [];
    const [fromYear, toYear] = yearRange;
    const from_year = fromYear ? String(fromYear.year()) : "";
    const to_year = toYear ? String(toYear.year()) : "";

    onApply({
      ...values,
      from_year,
      to_year,
      year: from_year && to_year ? `${from_year}-${to_year}` : "",
    });
  },[form, onApply]);

  const memoValues = useMemo(() => ({
    selectedMake,
    form,
    hasInitialValues,
    makeData,
    modelData,
    submit
  }), [form, selectedMake, hasInitialValues, makeData, modelData, submit]);

  return memoValues;
};

export default useFilterContent;
