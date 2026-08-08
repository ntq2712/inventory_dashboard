import { ActionStatus } from '../../mocks/data/actionStatus';

type ActionType = keyof typeof ActionStatus

export interface AgingAction {
  id: number;
  vehicleId: number;
  actionType: ActionType;
  note: string;
  createdBy: string;
  createdAt: string;
}
