import {
  BsBuildingFill,
  BsBuildingFillCheck,
  BsBuildingFillExclamation,
} from "react-icons/bs";
import VehicleSummaryItem from "./VehicleSummaryItem";
import styles from "./vehicleSummary.module.css";
import { useQuery } from "@tanstack/react-query";
import { vehiclesApi } from "../apis/vehicles";
import endpoint from "../apis/endpointConfig";

function VehicleSummary() {
  const { data } = useQuery({
    queryKey: [endpoint.vehicles.summary],
    queryFn: () => vehiclesApi.getSummary(),
    select: (res) => res.data.data,
  });

  return (
    <div className={styles.container}>
      <VehicleSummaryItem
        title="Total Vehicles"
        value={data?.total ?? 0}
        positive={true}
        percentageChange={10.5}
      >
        <div className={`${styles["icon-wrapper"]} ${styles["total"]}`}>
          <BsBuildingFill className={styles.icon} />
        </div>
      </VehicleSummaryItem>
      <VehicleSummaryItem
        title="New Vehicles"
        value={data?.new   ?? 0}
        positive={true}
        percentageChange={5.2}
      >
        <div className={`${styles["icon-wrapper"]} ${styles["available"]}`}>
          <BsBuildingFillCheck className={styles.icon} />
        </div>
      </VehicleSummaryItem>
      <VehicleSummaryItem
        title="Aging Vehicles"
        value={data?.aging ?? 0}
        positive={false}
        percentageChange={-3.1}
      >
        <div className={`${styles["icon-wrapper"]} ${styles["aging"]}`}>
          <BsBuildingFillExclamation className={styles.icon} />
        </div>
      </VehicleSummaryItem>
    </div>
  );
}

export default VehicleSummary;
