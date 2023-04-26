import { AxiosError } from "axios";
import { useEffect, useReducer } from "react";
import { http } from "utils";

interface IFetchState {
  data?: any,
  loading: boolean,
  error?: string,
}

let initialState: IFetchState = {
  data: undefined,
  loading: true,
  error: undefined,
}



const useFetch = (url: string) => {
  const [{ data, loading, error }, dispatch] = useReducer((prev: IFetchState, next: IFetchState) => ({ ...prev, ...next }), initialState);
  
  const fetch = async () => {
    try {
      const { data } = await http.get(url);
      dispatch({ loading: false, data: await data.data });
    } catch (error) {
      dispatch({
        loading: false,
        error: ((error as AxiosError)?.response?.data as any)?.message,
      });
    }
  };

  useEffect(() => { 
    fetch();
  }, [url]);

  return { data, loading, error, refetch: fetch };
}

export default useFetch;