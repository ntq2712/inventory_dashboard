import { useQuery } from "@tanstack/react-query";
import endpoint from "../apis/endpointConfig";
import { vehiclesApi } from "../apis/vehicles";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import styles from "./vehicleList.module.css";

interface VehicleExpandRowProps {
  vehicleId: number;
  colSpan: number;
}

function VehicleExpandRow({ vehicleId, colSpan }: VehicleExpandRowProps) {
  const { data } = useQuery({
    queryKey: [endpoint.vehicles.agingActionsByVehicle, vehicleId],
    queryFn: () => vehiclesApi.getAgingActions(vehicleId ?? 0),
    select: (data) => data.data.data,
    enabled: !!vehicleId,
  });

  return (
    <tr className={styles["vehicle-expand-row"]}>
      {!data && (
        <td colSpan={colSpan}>
          <MdSubdirectoryArrowRight />
          Empty log
        </td>
      )}
      {data && (
        <>
          <td colSpan={2}>
            <div style={{ display: "flex", flexDirection: "row", gap: 4, alignItems: 'center' }}>
              <MdSubdirectoryArrowRight />
              <div style={{ fontSize: 16, fontWeight: 600 }}>Action:</div>
              {data?.actionTypeLable}
            </div>
          </td>
          <td colSpan={colSpan - 2}>
            <div style={{ display: "flex", flexDirection: "row", gap: 4 }}>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Note:</div>
              {data?.note}
            </div>
          </td>
        </>
      )}
    </tr>
  );
}

export default VehicleExpandRow;
