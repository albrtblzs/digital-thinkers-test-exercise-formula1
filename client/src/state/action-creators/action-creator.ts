import { ActionType } from "../action-types/overtake-type";
import { Dispatch } from "redux";
import { Action } from "../actions/overtake-action";
import { Driver } from "../../pages/Drivers";
import axios from "axios";

export const overTake = (driverId: number) => {
  return async (dispatch: Dispatch<Action>) => {

    const overTakeDriver = async (driverId: number) => {
      const { data: response } = await axios.post(
        `http://localhost:8080/drivers/${driverId}/overtake`
      );
      return response as Driver[];
      // setArticles(response);
    };
  
    const drivers = await overTakeDriver(driverId);
   dispatch({
     type: ActionType.OVERTAKE,
     drivers: drivers,
   })
  }
 };