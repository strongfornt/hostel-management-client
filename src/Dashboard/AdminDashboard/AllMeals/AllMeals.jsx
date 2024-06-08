import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { CiEdit } from "react-icons/ci";
import Select from 'react-select';
import { useState } from "react";


export default function AllMeals() {
    const axiosSecure = useAxiosSecure();
    const [selectedOption, setSelectedOption] = useState(null);
    // const [allMeals,setAllMeals] = useState([])
    
    //tanstack for fetching data start =======================================
        const {data: allMeals = []} = useQuery({
            queryKey: ['allMeals',selectedOption],
            queryFn: async()=> {
                const {data} = await axiosSecure.get(`/allMeals?sort=${selectedOption}`)
                return data;
            }
        })
      

    //tanstack for fetching data end =======================================


       //select option for the like and review ==================
       const options = [
        { value: 'likes', label: 'Total Likes' },
        { value: 'reviews', label: 'Total Reviews' },
       
        
      ];
      const handleChange = (option) => {
        setSelectedOption(option?.value);
      };
       //select option for the like and review ==================
      console.log(selectedOption);
  return (
    <>
      <Helmet>
        <title>DineEase | AllMeals</title>
      </Helmet>
      <section className=" my-7 md:my-10  md:ml-[15rem] lg:ml-1  xl:ml-44 ">

      <div>
          <h1 className=" text-center text-2xl md:text-3xl font-bold text-[#4b5664] mb-2">
          Manage <span className="text-[#3F72AF]">Meals</span>
          </h1>
          <p className="text-sm text-center mb-8 max-w-screen-sm mx-auto text-[#4b5664] ">
          Effortlessly manage all meals in one place. View detailed information, update meal details, and ensure the quality of your offerings with ease.
          </p>
        </div>

        {/* main section start ====================================================== */}

      <div className="container p-2 mx-auto sm:p-4 text-gray-100 dark:text-gray-800">
	<div className="flex items-center justify-between mb-4" >
    <h2 className=" text-2xl font-semibold leading-tight">All Meals</h2>
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
					<th className="p-3">Reviews</th>
					<th className="p-3">Likes</th>
					<th className="p-3 ">Update</th>
					<th className="p-3 ">Delete</th>
					<th className="p-3 text-right  ">Details</th>
				</tr>
			</thead>
			<tbody>
                {
                    allMeals?.map((meal,idx)=> <tr key={idx} className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-[#F9F7F7]">
					<td className="p-3">
						<p>{meal?.title}</p>
					</td>
					<td className="p-3">
						<p>{meal?.creator?.name}</p>
					</td>
					<td className="p-3">
						<p>Total {meal?.reviews}</p>
						
					</td>
					<td className="p-3">
						<p>Total {meal?.likes}</p>
						
					</td>
                    <td className="px-3 py-2 ">
						<p>
                        <CiEdit className="text-emerald-500 text-lg" /></p>
					</td>
					<td className="px-3 py-2   ">
						<p><RiDeleteBin6Line className="text-pink-500 text-xl" /></p>
					</td>
					<td className="px-3 py-2 flex justify-end  items-center">
                    <p><HiOutlineViewGridAdd className="text-indigo-500 text-xl" /></p>
					</td>
				</tr>)
                }
				
			
			</tbody>
		</table>
	</div>
</div>
      </section>
    </>
  );
}
