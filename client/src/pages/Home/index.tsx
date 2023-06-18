import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { useEffect } from "react";
import { SideBar } from "@components/SideBar";
import { Chat } from "@components/Chat";

const Home = () => {
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const navigator = useNavigate();

  useEffect(() => {
    if (!user || !accessToken) navigator("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="flex">
      <SideBar />
      <Chat />
    </div>
  );
};

export default Home;
