/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { DatePicker, Form, Input, InputNumber, Popover, Select } from "antd";
import moment from "moment-timezone";
import { useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { vehiclesApi } from "../apis/vehicles";
import type { VehicleFilterState } from "../store/vehicleFilterSlice";
import styles from "./filterPopup.module.css";
import useVehicleFilter from "./hooks/useVehicleFilter";

const FilterPopupContent = ({
  onApply,
  onCancel,
  onReset,
  initialValues,
}: {
  onApply: (values: any) => void;
  onCancel: () => void;
  onReset: () => void;
  initialValues: VehicleFilterState;
}) => {
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

  const submit = async () => {
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
  };

  return (
    <Form
      form={form}
      className={styles["filter-popup-content"]}
      layout="vertical"
    >
      <Form.Item name="vin" label="VIN" className={styles["item"]}>
        <Input placeholder="VIN" />
      </Form.Item>

      <Form.Item name="make" label="Make" className={styles["item"]}>
        <Select options={makeData ?? []} showSearch placeholder="Select make" />
      </Form.Item>

      <Form.Item name="model" label="Model" className={styles["item"]}>
        <Select
          options={(modelData ?? []).map((model) => ({
            value: model,
            label: model,
          }))}
          showSearch
          placeholder={selectedMake ? "Select model" : "Choose make first"}
          disabled={!selectedMake}
        />
      </Form.Item>

      <Form.Item name="color" label="Color" className={styles["item-haft"]}>
        <Input placeholder="Color" />
      </Form.Item>

      <Form.Item name="year" label="Year" className={styles["item-haft"]}>
        <DatePicker.RangePicker style={{ width: "100%" }} picker="year" />
      </Form.Item>

      <Form.Item
        name="from_price"
        label="From Price"
        className={styles["item-haft"]}
      >
        <InputNumber className={styles["form-input"]} min={0} />
      </Form.Item>
      <Form.Item
        name="to_price"
        label="To Price"
        className={styles["item-haft"]}
      >
        <InputNumber className={styles["form-input"]} min={0} />
      </Form.Item>

      <div
        className={`${styles["item"]} ${styles["filter-pp-btn-container"]} `}
      >
        <button
          type="button"
          onClick={() => {
            if (hasInitialValues) {
              // reset to default filters
              form.resetFields();
              onReset();
              onCancel();
              return;
            }
            form.resetFields();
            onCancel();
          }}
          className={`${styles["filter-pp-btn"]} ${styles["cancel"]}`}
        >
          {hasInitialValues ? "Reset Filters" : "Cancel"}
        </button>
        <button
          type="button"
          onClick={submit}
          className={`${styles["filter-pp-btn"]} ${styles["apply"]}`}
        >
          Apply
        </button>
      </div>
    </Form>
  );
};

function FilterPopup() {
    const {filters, open, handleApply, onReset, setOpen} = useVehicleFilter()

  return (
    <Popover
      title={<div className={styles["filter-title"]}>Filter</div>}
      trigger="click"
      open={open}
      onOpenChange={(next) => setOpen(next)}
      content={
        <FilterPopupContent
          onReset={onReset}
          onApply={handleApply}
          onCancel={() => setOpen(false)}
          initialValues={filters}
        />
      }
      placement="bottomRight"
      arrow={false}
    >
      <button className={styles["filter-btn"]}>
        <FaFilter />
      </button>
    </Popover>
  );
}

export default FilterPopup;
