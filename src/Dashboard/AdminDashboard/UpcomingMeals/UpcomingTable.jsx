import moment from "moment";
import { MdOutlinePublishedWithChanges, MdOutlineUpcoming } from "react-icons/md";


// eslint-disable-next-line react/prop-types
export default function UpcomingTable({meal}) {
    const { title, creator, currentTime } = meal || {}
  return (
    <>
        <tr  className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-[#F9F7F7]">
					<td className="p-3">
						<p>{title}</p>
					</td>
					<td className="p-3">
						<p>{creator?.name}</p>
					</td>
					<td className="p-3">
						<p>{moment(currentTime, 'MMMM DD, YYYY hh:mm:ss A').fromNow()}</p>
						
					</td>
					<td className="p-3">
						<p>Total 0</p>
						
					</td>
                    <td className="px-3 py-2 ">
						<button className="cursor-pointer" >
                     
                        <MdOutlinePublishedWithChanges className="text-emerald-500 text-lg" />
                        </button>

					</td>
					<td className="px-3 py-2   ">
						<button className="cursor-pointer" >
                        <MdOutlineUpcoming className="text-pink-500 text-xl"  />
                        </button>
					</td>
					
				</tr>
				
    </>
  )
}
