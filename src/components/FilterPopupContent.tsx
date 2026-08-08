/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import type { VehicleFilterState } from "../store/vehicleFilterSlice";
import styles from "./filterPopup.module.css";
import useFilterContent from "./hooks/useFilterContent";

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
  const { form, selectedMake, hasInitialValues, makeData, modelData, submit } =
    useFilterContent(initialValues, onApply);

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

export default FilterPopupContent;
