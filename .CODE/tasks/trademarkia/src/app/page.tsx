"use client";
import { Camera, CircleDot, Dot, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Loading from "./components/Loading";
import Error from "./components/Error";
import StatusFilter from "./components/StatusFilter";
import TabsWithSearch from "./components/TabsWithSearch";
import FilterSearch from "./components/FilterSearch";

export default function Home() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const statuses = [
    { label: "All", color: "bg-blue-500" },
    { label: "Registered", color: "bg-green-500" },
    { label: "Pending", color: "bg-yellow-400" },
    { label: "Abandoned", color: "bg-red-500" },
    { label: "Others", color: "bg-gray-500" },
  ];
  const [change, setChange] = useState(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [owners, setOwners] = useState([]);
  const [lawFirms, setLawFirms] = useState([]);
  const [attorneys, setAttorneys] = useState([]);
  const [grid,setGrid]=useState(true)
  const [arr, setArr] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          "https://vit-tm-task.api.trademarkia.app/api/v3/us",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              input_query: "check",
              input_query_type: "",
              sort_by: "default",
              status: [],
              exact_match: false,
              date_query: false,
              owners: [],
              attorneys: [],
              law_firms: [],
              mark_description_description: [],
              classes: [],
              page: 1,
              rows: 10,
              sort_order: "desc",
              states: [],
              counties: [],
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [change]);
  useEffect(() => {
    setAttorneys(data?.body.aggregations?.attorneys?.buckets || []);
    setOwners(data?.body.aggregations?.current_owners?.buckets || []);
    setLawFirms(data?.body.aggregations?.law_firms?.buckets || []);
    setArr(data?.body?.hits?.hits);
  }, [data]);
  return (
    <div>
      {/* Headerserction */}
      <div className=" py-5 px-2 xl:px-5  items-center sm:flex sm:justify-between border-b-2 border-b-gray-300 shadow-sm ">
        <div className="text-xl xl:text-3xl font-semibold text-gray-700 items-center pb-3">
          <span className="text-blue-700">Trade</span>
          <span className="text-black">mark</span>
          <span className="text-orange-500">ia</span>
        </div>

        <div className="flex items-center gap-3 md:justify-center">
          <div className="flex  items-center gap-4 border-1 p-4 rounded-2xl border-gray-300 ">
            <Search className="hidden md:block" />
            <input
              type="text"
              placeholder="Search"
              className="w-[60vw] md:w-[40vw] border-0 outline-none"
            />
            <Camera className="hidden md:block" />
          </div>
          <button className="bg-[#4380EC] p-4 px-6 rounded-2xl text-white">
            Search
          </button>
        </div>
        <div>
          <button className="bg-[#E6670D] p-4 px-6 rounded-2xl text-white hidden  xl:block ">
            Apply for Trademark
          </button>
        </div>
      </div>
      <div>
        {loading && <Loading />}
        {error && <Error />}

        <div className="md:flex">
          <div className="w-[71vw]">
            {" "}
            {arr?.map((e) => (
              <span key={e._id}>
                <div className="border-1 m-4 p-3 rounded-2xl border-gray-300 ">
                  <div className="flex justify-between">
                    <div className="text-xl text-shadow-amber-100 font-semibold p-4">
                      {e._source.law_firm}
                    </div>
                    <div className="flex-col justify-center items-center gap-1 p-2 ">
                      <div className="flex items-center gap-1 text-green-400">
                        <Dot className=" text-4xl " />
                        {" Live / " + e._source.status_type}
                      </div>
                      <p className="flex items-center gap-1 justify-center">
                        On{" "}
                        {(() => {
                          const raw =
                            e._source.first_use_anywhere_date?.toString(); // "20190416"
                          if (!raw || raw.length !== 8) return "N/A"; // basic safety

                          const year = raw.slice(0, 4);
                          const month = raw.slice(4, 6);
                          const day = raw.slice(6, 8);

                          const date = new Date(`${year}-${month}-${day}`);
                          return date.toLocaleDateString(); // or use .toDateString()
                        })()}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="p-5">
                      <p>{e._source.law_firm}</p>
                      <p>{e._source.search_bar.owner}</p>
                    </div>
                    <div className="flex justify-center items-center gap-2 p-5">
                      {" "}
                      {e._source.registration_number}
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      className="px-5 text-sm"
                    >
                      {e._source.mark_description_description?.[0]}
                    </p>
                    {/* <p   style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    className="px-5 text-sm">{e._source.class_codes.map}</p> */}
                  </div>
                  <div className="p-5">
                    <button className="border-2 border-blue-500 p-4 px-9 rounded-2xl text-blue-500 hover:bg-blue-500 hover:text-white">
                      View
                    </button>
                  </div>
                </div>
              </span>
            ))}
          </div>
          <div className="w-[25vw] border-1 ml-5 mt-5  rounded-xl border-gray-300">
            {/* status */}
            <div className=" border-1 m-5 p-5 border-gray-300 rounded-2xl shadow-2xl font-bold text-xl">
              <p>Status</p>
              <div className="flex flex-row flex-wrap gap-3">
                {statuses.map((status) => (
                  <button
                    key={status.label}
                    onClick={() => setSelectedStatus(status.label)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 text-sm border-gray-300 ${
                      selectedStatus === status.label
                        ? "bg-gray-300 !important"
                        : "bg-white"
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${status.color}`}
                    ></span>
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="m-5 rounded-2xl">
              {" "}
              <FilterSearch
                owners={owners.map((item) => item.key)}
                lawFirms={lawFirms.map((item) => item.key)}
                attorneys={attorneys.map((item) => item.key)}
              />
            </div>
            <div className="border-1 m-5 p-5 border-gray-300 rounded-2xl shadow-2xl font-bold text-xl">
            <p className="pb-3">Display</p>
            <div className="flex justify-between rounded-xl p-5 bg-gray-300">
              <button className={`flex justify-center px-7 ${grid && 'bg-white'} p-3 rounded-xl`} onClick={()=>setGrid(true)}>Grid View</button>
              <button className={`flex justify-center px-7 ${!grid && 'bg-white'} p-3 rounded-xl`} onClick={()=>setGrid(false)}>List View</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
