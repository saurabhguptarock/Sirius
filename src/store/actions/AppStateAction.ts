export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

export const setLoading = (loadingState: boolean) => {
  return {
    type: SET_LOADING,
    payload: loadingState,
  };
};

export const setError = (error: string) => {
  return {
    type: SET_ERROR,
    payload: error,
  };
};
