import { Form, Input, Modal, notification, Select } from "antd";
import { useState } from "react";
import { AiOutlineAudit } from "react-icons/ai";
import { ActionStatus } from "../mocks/data/actionStatus";
import styles from "./vehicleList.module.css";
import { useQuery } from "@tanstack/react-query";
import endpoint from "../apis/endpointConfig";
import { vehiclesApi } from "../apis/vehicles";

interface LogModalProps {
  item?: Vehicle;
}

function LogModal({ item }: LogModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = () => {
    api.success({
      title: "Log action sucess",
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: [endpoint.vehicles.agingActionsByVehicle, item?.id],
    queryFn: () => vehiclesApi.getAgingActions(item?.id ?? 0),
    select: (data) => data.data.data,
    enabled: !!item?.id && isModalOpen,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);

    console.log("Vehicle:", item);

    openNotificationWithIcon();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <button
        className={`${styles["action-btn"]} ${styles["view-btn"]}`}
        onClick={showModal}
      >
        <AiOutlineAudit className={styles["action-btn-icon"]} />
      </button>
      <Modal
        title={`Log: ${item?.vin}`}
        centered
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        okText="Log"
        onCancel={handleCancel}
      >
        {!isLoading && (
          <Form layout="vertical" className={styles["log-model-form"]}>
            <Form.Item label="Action" name="action_status">
              <Select
                defaultValue={data?.actionType}
                options={Object.entries(ActionStatus).map(([key, value]) => ({
                  label: value,
                  value: key,
                }))}
                placeholder="Select action"
                allowClear
              />
            </Form.Item>
            <Form.Item label="Additional Notes" name="note">
              <Input.TextArea defaultValue={data?.note ?? ""} />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
}

export default LogModal;
