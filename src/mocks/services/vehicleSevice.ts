import moment from "moment-timezone";
import { HttpResponse } from "msw";
import type { AgingActionRepose } from "../../types/responses/agingActionRepose";
import { ActionStatus } from "../data/actionStatus";
import { AgingAction as AgingActionData } from "../data/agingAction";
import { makeOptions, makeModelMap } from "../data/makeModel";
import vehicles from "../data/vehicle";

export const getVehicles = (vehicleFilter: VehicleFilter) => {
  const data: Vehicle[] = vehicles.filter((item) => {
    let access = true;

    if (vehicleFilter.searchText) {
      const term = vehicleFilter.searchText.toLowerCase();
      access = access && item.vin.toLowerCase().includes(term);
    }

    if (vehicleFilter.vin) {
      access = access && item.vin === vehicleFilter.vin;
    }

    if (vehicleFilter.make) {
      access = access && item.make === vehicleFilter.make;
    }

    if (vehicleFilter.model) {
      access = access && item.model === vehicleFilter.model;
    }

    if (vehicleFilter.color) {
      access = access && item.color === vehicleFilter.color;
    }

    if (vehicleFilter.from_year && vehicleFilter.to_year) {
      access =
        access &&
        item.year >= Number(vehicleFilter.from_year) &&
        item.year <= Number(vehicleFilter.to_year);
    }

    if (vehicleFilter.from_price && vehicleFilter.to_price) {
      access =
        access &&
        item.price >= Number(vehicleFilter.from_price) &&
        item.price <= Number(vehicleFilter.to_price);
    }

    return access;
  });

  const result = data
    .slice(
      vehicleFilter.pageIndex! * vehicleFilter.pageSize!,
      (vehicleFilter.pageIndex! + 1) * vehicleFilter.pageSize!,
    )
    .map((item) => {
      const temp: VehicleReponse = {
        ...item,
        isAging: false,
      };

      const createdAt = moment.utc(item.createdAt);
      const now = moment.utc();

      const daysInStock = now.diff(createdAt, "days");

      temp.isAging = daysInStock >= 90;

      return temp;
    });

  return HttpResponse.json<APIResponse<VehicleReponse[]>>({
    status: 200,
    success: true,
    data: result,
    message: "Vehicles retrieved successfully",
    totalRows: data.length,
  });
};

export const getVehicalSummary = () => {
  const data: VehicleSummaryReponse = {
    total: vehicles.length,
    aging: 0,
    new: 0,
  };

  vehicles.map((item) => {
    const createdAt = moment.utc(item.createdAt);
    const now = moment.utc();

    const daysInStock = now.diff(createdAt, "days");

    if (daysInStock >= 90) {
      data.aging += 1;
    } else {
      data.new += 1;
    }
  });

  return HttpResponse.json<APIResponse<VehicleSummaryReponse>>({
    status: 200,
    success: true,
    data: data,
    message: "Get vehicles summary successfully",
  });
};

export const getVehicleAgingActionsByVehicleId = (vehicleId: number) => {
  const data = AgingActionData.find((action) => action.vehicleId === vehicleId);
  const result: AgingActionRepose | undefined = data
    ? {
        ...data,
        actionTypeLable: data?.actionType ? ActionStatus[data?.actionType] : "",
      }
    : undefined;

  return HttpResponse.json<APIResponse<AgingActionRepose | undefined>>({
    status: 200,
    success: true,
    data: result,
    message: "Aging actions retrieved successfully",
  });
};

export const getVehicleMakes = () => {
  return HttpResponse.json<APIResponse<typeof makeOptions>>({
    status: 200,
    success: true,
    data: makeOptions,
    message: "Vehicle makes retrieved successfully",
  });
};

export const getVehicleModelsByMake = (make: string) => {
  const data = makeModelMap[make] || [];
  return HttpResponse.json<APIResponse<string[]>>({
    status: 200,
    success: true,
    data,
    message: "Vehicle models retrieved successfully",
  });
};
