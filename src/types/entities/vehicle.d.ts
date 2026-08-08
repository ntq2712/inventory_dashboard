type VehicleStatus = "In Stock" | "Reserved";

interface Vehicle {
  id: number;
  dealershipId: number;
  vin: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  color: string;
  price: number;
  status: VehicleStatus;
  intakeDate: string;
  daysInStock: number;
  currentAgingStatus: ActionType | null;
  createdAt: string;
  updatedAt: string;
}

