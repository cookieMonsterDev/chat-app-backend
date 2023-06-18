import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./ReduxHooks";
import { refreshAuth } from "../store/reducers/auth";

const useRefreshAuth = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const refresh = () => {
    if (!user) return;
    dispatch(refreshAuth());
  };

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    const interval = setInterval(refresh, 100000);

    return () => {
      clearInterval(interval);
    };
  }, [user]);
};

export default useRefreshAuth;
