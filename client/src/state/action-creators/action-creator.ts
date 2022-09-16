import { ActionType } from "../action-types/overtake-type";
import { Dispatch } from "redux";
import { Action } from "../actions/overtake-action";
import { Driver } from "../../pages/Drivers";

export const overTake = (drivers: Driver[]) => {
  return (dispatch: Dispatch<Action>) => {
   dispatch({
     type: ActionType.OVERTAKE,
     drivers: drivers,
   })
  }
 };