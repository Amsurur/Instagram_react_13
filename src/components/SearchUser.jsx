import React, { forwardRef, useEffect, useRef, useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import searchSlice, {
  delUser,
  dellAll,
  getHistory,
  postSearch,
  searchData,
} from "../api/search/searchSlice";

import ClearIcon from "@mui/icons-material/Clear";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchIcon from "@mui/icons-material/Search";

const SearchUser = ({ onCloseModal }) => {
  const closeModalSearch = useRef();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.search.data);
  const data1 = useSelector((state) => state.search.data1);
  const imageApi = import.meta.env.VITE_APP_FILES_URL;
  useEffect(() => {
    dispatch(searchData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);
  // console.log(data1);

  let [search1, setSearch] = useState("");
  // const tooltiRef=useRef(null)

  return (
    <>
      <div
        ref={closeModalSearch}
        onClick={(event) => {
          console.log(event.target);
          console.log(closeModalSearch.current);
          if (event.target === closeModalSearch.current) {
            onCloseModal(false);
          }
        }}
        className="w-full h-full fixed ml-[6%]"
      >
        <div
          data-aos="fade-right"
          data-aos-duration="800"
          className="searchModal  dark:bg-gray-950 dark:text-gray-100 p-[22px] fixed  w-[390px] bg-white z-9999  "
        >
          <div className="flex justify-between items-center mb-[6vh] mt-[1vh]">
            <h1 className="text-[24px] ">Поисковый запрос</h1>
          </div>

          <input
            onChange={(e) => setSearch(e.target.value)}
            onInput={(e) => dispatch(searchData(e.target.value))}
            type="text"
            className="bg-[#f4f3f3] w-[100%] rounded-[7px] text-[15px] outline-none text-black p-[8px] px-[13px] "
            placeholder="Поиск..."
          />
          <p className="mt-[4vh] border-t-gray-400 border-t-[1px]"></p>

          <div className="overflow-y-scroll  h-[100vh] mt-[4vh] w-[106%]  ">
            <div className="flex justify-between mb-[3vh]">
              <button className="text-[16px] text-black dark:text-white">
                Недавнее
              </button>
              <button
                onClick={() => dispatch(dellAll())}
                className="text-blue-600 mr-[6%] hover:text-purple-800 px-[10px] py-[4px] rounded-[4px]"
              >
                Очистить все
              </button>
            </div>
            <div className="flex flex-col gap-[15px] ">
              {search1 == "" ? (
                data1?.map((e) => {
                  return (
                    <div
                      key={e.id}
                      className="flex justify-between  cursor-pointer"
                    >
                      <div className="flex gap-[10px] ">
                        {/* <h1>{e.id}</h1> */}
                        <img
                          className="w-[45px] h-[45px] rounded-[50%]"
                          src={`${imageApi}${e.users.avatar}`}
                          alt=""
                        />

                        <div>
                          <h1 className="text-[15px]">{e.users.userName}</h1>
                          <h2 className="text-gray-500">{e.users.fullName}</h2>
                        </div>
                      </div>
                      <ClearIcon
                        onClick={() => dispatch(delUser(e.id))}
                        sx={{ maxWidth: "22px", color: "gray" }}
                        className="mr-[5%] "
                      />
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col gap-[15px]   cursor-pointer">
                  {data?.map((e) => {
                    return (
                      <div
                        key={e.id}
                        onClick={() => dispatch(postSearch(e.id))}
                        className="flex gap-[10px]"
                      >
                        <img
                          className="w-[45px] h-[45px] rounded-[50%]"
                          src={`${imageApi}${e.avatar}`}
                          alt=""
                        />
                        <div>
                          <h1 className="text-[15px]">{e.userName}</h1>
                          <h2 className="text-gray-500">{e.fullName}</h2>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchUser;
