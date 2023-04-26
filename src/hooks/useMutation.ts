import { AxiosError } from "axios";
import { useEffect, useReducer } from "react";
import { http } from "utils";

interface IMutationState {
  data?: any;
  loading: boolean;
  error?: string;
}

const initialState: IMutationState = {
  loading: true,
  data: undefined,
  error: undefined
}

const useMutation = (url: string, method: string, payload: object) => {
  const [{ data, loading, error }, dispatch] = useReducer((prev: IMutationState, next: IMutationState) => ({ ...prev, ...next }), initialState);

  useEffect(() => { 
    (async () => { 
      try {
        const {data} = await http({ url, method, data: payload });
        dispatch({ loading: false, data: data.data });
      } catch (error) {
         dispatch({
           loading: false,
           error: ((error as AxiosError)?.response?.data as any)?.message,
         });
      }
    })()
  }, [payload, url]);

  return { data, loading, error };
};

export default useMutation;
