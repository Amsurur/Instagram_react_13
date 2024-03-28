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
import { Link, useNavigate } from "react-router-dom";

const SearchUser = ({ onCloseModal }) => {
  const Navigate = useNavigate();
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
  console.log(data1.length === 0 && search1 === "");
  return (
    <>
      <div
        ref={closeModalSearch}
        onClick={(event) => {
          // console.log(event.target);
          // console.log(closeModalSearch.current);
          if (event.target === closeModalSearch.current) {
            onCloseModal(false);
          }
        }}
        className="w-full h-full fixed z-50  ml-[6%]"
      >
        <div
          data-aos="fade-right"
          data-aos-duration="800"
          className="searchModal  dark:bg-gray-950 dark:text-gray-100 p-[22px] fixed  w-[390px] bg-white   "
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
              {data1.length === 0 && search1 === "" ? (
                <div className="cursor-pointer text-center m-auto mt-[24vh]">
                  <h1 className="text-center m-auto text-[15px] text-gray-600">
                    Нет недавних запросов.
                  </h1>
                </div>
              ) : search1.trim().length == "" ? (
                data1?.map((e) => {
                  return (
                    <Link to={`user/${e.users.id}`} >
                      
                      <div
                        key={e.id}
                        className="flex justify-between  cursor-pointer"
                      >
                        <div className="flex gap-[10px] ">
                          {/* <h1>{e.id}</h1> */}
                          <img
                            className="w-[50px] h-[50px] rounded-[50%] border-[2px] p-[1px] border-[#DE0046]"
                            src={
                              e.users.avatar !== ""
                                ? `${imageApi}${e.users.avatar}`
                                : "data:image/jpeg;base64,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"
                            }
                            alt=""
                          />

                          <div>
                            <h1 className="text-[15px]">{e.users.userName}</h1>
                            <h2 className="text-gray-500">
                              {e.users.fullName}
                            </h2>
                          </div>
                        </div>
                        <ClearIcon
                          onClick={() => dispatch(delUser(e.id))}
                          sx={{ maxWidth: "22px", color: "gray" }}
                          className="mr-[5%] hover:bg-gray-200 rounded-[4px]"
                        />
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="flex flex-col  gap-[15px]  cursor-pointer">
                  {data?.map((e) => {
                    // console.log(data.id);

                    return (
                      <Link to={`user/${e.id}`}>
                        <div
                          key={e.id}
                          onClick={() => dispatch(postSearch(e.id))}
                          className="flex gap-[10px] "
                        >
                          <img
                            className="w-[50px] h-[50px] rounded-[50%] border-[2px] p-[2px] border-[#DE0046]"
                            src={
                              e.avatar !== ""
                                ? `${imageApi}${e.avatar}`
                                : "data:image/jpeg;base64,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"
                            }
                            alt=""
                          />
                          {/* src={`${imageApi}${e.avatar}`} */}
                          {/* alt="" /> */}
                          <div>
                            <h1 className="text-[15px]">{e.userName}</h1>
                            <h2 className="text-gray-500">{e.fullName}</h2>
                          </div>
                        </div>
                      </Link>
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
