interface VehicleReponse extends Vehicle {
  isAging: boolean;
}

interface VehicleSummaryReponse {
  total: number
  aging: number
  new: number
}