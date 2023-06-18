import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { SearchProps, User } from "./Search.types";
import chatApi from "../../base/axiosConfig";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { Link } from "react-router-dom";
import icon from "../../../public/message-icon.svg";

export const SearchComponent: React.FC<SearchProps> = () => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[] | null>(null);
  const [focus, setFocus] = useState(false);

  const handleBlur = () => {
    setFocus(false);
    setUsers(null);
  };

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value && setSearch(e.target.value);
  }, 300);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await chatApi.get("/users", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUsers(data);
      } catch (error) {
        setFocus(false);
        setSearch("");
        setUsers(null);
      }
    };

    search && getUsers();
  }, [search]);

  return (
    <div className="px-2 mb-2">
      <input
        onChange={handleChange}
        onFocus={() => setFocus(true)}
        onBlur={handleBlur}
        placeholder="Find the user?"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      {focus && users && (
        <ul className="absolute z-50 bg-gray-50 border border-gray-300 p-2 mt-1 max-h-80 overflow-auto w-72">
          {users &&
            users.map((e) => (
              <li key={e.id} className="m-2 py-0.5">
                <div className="flex justify-between">
                  <p>{e.firstName ?? e.username}</p>
                  <Link to={`/${e.id}`}>
                    <img src={icon} alt="link" width={20} height={20} />
                  </Link>
                </div>
                <hr className="w-full mb-2 h-1 self-center bg-blue-700 rounded" />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
