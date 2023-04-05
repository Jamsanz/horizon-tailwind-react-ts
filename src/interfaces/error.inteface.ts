import { AxiosError } from "axios";

export interface IError extends AxiosError {
  data: { message: string };
}
