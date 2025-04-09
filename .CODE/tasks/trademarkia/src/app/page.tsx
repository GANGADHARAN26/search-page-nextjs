'use client'
import { Camera, Search } from "lucide-react";
import { useState } from "react";
import Filter from "./components/Filter";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
 <Filter/>
      </div>
    </div>
  );
}
