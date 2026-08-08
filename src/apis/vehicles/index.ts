import { instance } from "../config";
import endpoint from "../endpointConfig";

const getVehiclesApi = (body: VehicleFilter) => {
  return instance.post<APIResponse<VehicleReponse[]>>(endpoint.vehicles.list, body);
};

const getVehicleSummaryApi = () => {
  return instance.get<APIResponse<VehicleSummaryReponse>>(endpoint.vehicles.summary);
};

import type { AgingActionRepose } from "../../types/responses/agingActionRepose";

const getVehicleAgingActionsApi = (vehicleId: number) => {
  const url = endpoint.vehicles.agingActionsByVehicle.replace(":vehicleId", String(vehicleId));
  return instance.get<APIResponse<AgingActionRepose | undefined>>(url);
};

const getVehicleMakesApi = () => {
  return instance.get<APIResponse<{ value: string; label: string }[]>>(endpoint.vehicles.makes);
};

const getVehicleModelsByMakeApi = (make: string) => {
  const url = endpoint.vehicles.modelsByMake.replace(":make", encodeURIComponent(make));
  return instance.get<APIResponse<string[]>>(url);
};

export const vehiclesApi = {
  getVehicles: getVehiclesApi,
  getSummary: getVehicleSummaryApi,
  getAgingActions: getVehicleAgingActionsApi,
  getMakes: getVehicleMakesApi,
  getModelsByMake: getVehicleModelsByMakeApi,
};
