'use client'
import { Camera, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Loading from "./components/Loading";
import Error from "./components/Error";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch('https://vit-tm-task.api.trademarkia.app/api/v3/us', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input_query: 'check',
            input_query_type: '',
            sort_by: 'default',
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
            sort_order: 'desc',
            states: [],
            counties: [],
          }),
        });

        if (!response.ok) {
          throw new Error('Something went wrong');
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
  }, []);

  return (
    <div>
      {/* Headerserction */}
      <div className=" py-5 px-2 xl:px-5  items-center md:flex md:justify-between border-b-2 border-b-gray-300 shadow-sm ">
        <div className="text-3xl font-semibold text-gray-700 items-center pb-3">
          <span className="text-blue-700">Trade</span>
          <span className="text-black">mark</span>
          <span className="text-orange-500">ia</span>
        </div>

        <div className="flex items-center gap-3 justify-center">
          <div className="flex  items-center gap-4 border-1 p-4 rounded-2xl border-gray-300 ">
            <Search />
            <input
              type="text"
              placeholder="Search"
              className="w-[40vw] border-0 outline-none"
            />
            <Camera />
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
      {loading&& <Loading/>}
      {error&& <Error/>}
      {data&&<p>Fetched successfully</p>}
      </div>
    </div>
  );
}
