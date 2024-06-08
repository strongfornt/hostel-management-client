import { useState } from "react";
import { Helmet } from "react-helmet-async";

import Select from 'react-select';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UpcomingTable from "./UpcomingTable";

export default function UpcomingMeals() {
    const axiosSecure = useAxiosSecure();
    const [selectedOption, setSelectedOption] = useState(null);

    //use tanstack for fetching data ==============================
    const {data: mealsData = []} = useQuery({
        queryKey:['upcomingMeals'],
        queryFn: async () => {
            const {data} = await axiosSecure.get('/upcomingMeals');
            return data;
        }
    })
    //use tanstack for fetching data end ==============================
    


    //select option for the like and review ==================
    const options = [
        { value: 'likes', label: 'Total Likes' },
    
      ];
      const handleChange = (option) => {
        setSelectedOption(option?.value);
      };
       //select option for the like and review ==================
  return (
    <>
         <Helmet>
        <title>DineEase | UpcomingMeals</title>
      </Helmet>
  

        <section className="my-7 md:my-10  md:ml-[15rem] lg:ml-1  xl:ml-44" >
        <div>
          <h1 className=" text-center text-2xl md:text-3xl font-bold text-[#4b5664] mb-2">
          Next on the <span className="text-[#3F72AF]">Menu</span>
          </h1>
          <p className="text-sm text-center mb-8 max-w-screen-sm mx-auto text-[#4b5664] ">
          Stay informed about the delicious meals coming your way. Explore what our chefs are preparing for the near future.
          </p>
        </div>

        {/* main section start here =============================== */}
        <div className="container p-2 mx-auto sm:p-4 text-gray-100 dark:text-gray-800">
	<div className="flex items-center justify-between mb-4" >
    <h2 className=" text-2xl font-semibold leading-tight">Meal Preview</h2>
        <div className="flex items-center gap-5" >
        <div className="  ">
              <button
                onClick={() => {
                 setSelectedOption(null)
                }}
                className="px-4 py-1 bg-[#3F72AF] text-white rounded-md hover:bg-[#4b8bd9] duration-300 font-medium"
              >
                Reset
              </button>
            </div>
        <Select
        // value={selectedOption}
        defaultValue={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="Sort By"
      />
        </div>
    </div>
	<div className="overflow-x-auto">
		<table className="min-w-full text-xs">
			<colgroup>
				<col />
				<col />
				<col />
				<col />
				<col />
				<col className="w-24" />
			</colgroup>
			<thead className="bg-gray-700 dark:bg-gray-300">
				<tr className="text-left">
					<th className="p-3">Title</th>
					<th className="p-3">Distributor</th>
					<th className="p-3">Post Time</th>
					<th className="p-3">Likes</th>
					<th className="p-3 ">Publish</th>
					<th className="p-3 ">Upcoming</th>
					
				</tr>
			</thead>
			<tbody>
                
                    {
                        mealsData?.map((meal,idx)=> <UpcomingTable key={idx} meal={meal} />)
                    }
			</tbody>
		</table>
	</div>
</div>
        </section>

           
    </>
  )
}
