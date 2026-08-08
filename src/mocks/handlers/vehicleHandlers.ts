/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "msw";
import endpoint from "../../apis/endpointConfig";
import {
  getVehicalSummary,
  getVehicles,
  getVehicleAgingActionsByVehicleId,
  getVehicleMakes,
  getVehicleModelsByMake,
} from "../services/vehicleSevice";

export const vehicleHandlers = [
  http.post(endpoint.vehicles.list, async ({ request }) => {
    const vehicleFilter = await request.json();

    return getVehicles(vehicleFilter as VehicleFilter);
  }),
  http.get(endpoint.vehicles.summary, async () => {
    return getVehicalSummary();
  }),
  http.get(endpoint.vehicles.agingActionsByVehicle, async ({ request }: any) => {
    const url = typeof request.url === "string" ? request.url : request.url?.href;
    const pathname = url ? new URL(url, "http://localhost").pathname : "";
    const vehicleId = Number(pathname.split("/").filter(Boolean).slice(-2)[0]);

    return getVehicleAgingActionsByVehicleId(vehicleId);
  }),
  http.get(endpoint.vehicles.makes, async () => {
    return getVehicleMakes();
  }),
  http.get(endpoint.vehicles.modelsByMake, async ({ request }: any) => {
    const url = typeof request.url === "string" ? request.url : request.url?.href;
    const pathname = url ? new URL(url, "http://localhost").pathname : "";
    const make = decodeURIComponent(pathname.split("/").filter(Boolean).slice(-2)[0]);
    return getVehicleModelsByMake(make);
  }),
];
