import { AxiosError } from "axios";
import { Dispatch } from "react";
import { IUser } from "../../interfaces/user.interface";
import { AsyncGetItem, http } from "../../utils";
import {
  getProfile,
  getProfileError,
  getProfileSuccessful,
} from "../slices/profile.slice";

export const getProfileController = (id?: string) => async (dispatch: Dispatch<any>) => {
  dispatch(getProfile());
  let token = await AsyncGetItem('token');
    try {
      const response = await http.get(`/users/${id}`, {
        headers: {
          Authentication: `Bearer ${token}`
        }
      });
      dispatch(getProfileSuccessful(response.data.data));
    } catch (error) {
      dispatch(
        getProfileError(((error as AxiosError).response?.data as any).message)
      );
      console.log(error);
      console.log(((error as AxiosError).response?.data as any).message);
    }
  };
