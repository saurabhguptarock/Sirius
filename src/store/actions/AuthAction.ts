export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const login = (uid: string) => async (dispatch: Function) => {
  return dispatch({
    type: LOGIN_USER,
    user: { uid },
  });
};

export const logout = () => async (dispatch: Function) => {
  return dispatch({
    type: LOGOUT_USER,
  });
};
