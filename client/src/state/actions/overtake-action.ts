import { Driver } from "../../pages/Drivers";
import { ActionType } from "../action-types/overtake-type";

interface OvertakeAction {
  type: ActionType.OVERTAKE,
  drivers: Driver[],

}


export type Action = OvertakeAction;