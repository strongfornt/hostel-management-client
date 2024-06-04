export default function ManageUsers() {
  return (
    <>
      <section className=" min-h-[calc(100vh-72px)] md:min-h-screen  flex md:ml-[15rem] lg:ml-1  xl:ml-44  justify-center">
        {/* <h1>afa</h1> */}
        <div className="container  mx-auto  text-gray-100 dark:text-gray-800">
          <h2 className="mb-4 text-2xl font-semibold leading-tight">
            Invoices
          </h2>
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
                  <th className="p-3">Name</th>
                  <th className="p-3"></th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3 text-right"></th>
                  <th className="p-3"> Subs/Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-[#F9F7F7]">
                  <td className="p-3">
                    <p>Ahsan ullah</p>
                  </td>
                  <td className="p-3">{/* <p>Microsoft Corporation</p> */}</td>
                  <td className="p-3">
                    <p>ahsanullah@gmaill.com</p>
                  </td>
                  <td className="p-3">
                    {/* <button className=" cursor-pointer" >
                        <p className="bg-red-100/60 px-3 font-semibold   py-1 w-fit text-red-500 rounded-md" >Make Admin</p>
						
                        </button> */}
                    <button>
                      <p className="bg-emerald-100/60 px-3 font-semibold   py-1 w-fit text-emerald-500  rounded-md">
                        Admin
                      </p>
                    </button>
                  </td>
                  <td className="p-3 text-right">
                    <p></p>
                  </td>
                  <td className="p-3 ">
                    <span className="px-3 py-1 font-semibold rounded-md  bg-[#3F72AF] text-gray-900 dark:text-gray-50">
                      <span>Bronze</span>
                    </span>
                  </td>
                </tr>
                {/* <tr className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50">
					<td className="p-3">
						<p>97412378923</p>
					</td>
					<td className="p-3">
						<p>Tesla Inc.</p>
					</td>
					<td className="p-3">
						<p>14 Jan 2022</p>
						<p className="text-gray-400 dark:text-gray-600">Friday</p>
					</td>
					<td className="p-3">
						<p>01 Feb 2022</p>
						<p className="text-gray-400 dark:text-gray-600">Tuesday</p>
					</td>
					<td className="p-3 text-right">
						<p>$275</p>
					</td>
					<td className="p-3 text-right">
						<span className="px-3 py-1 font-semibold rounded-md bg-violet-400 dark:bg-violet-600 text-gray-900 dark:text-gray-50">
							<span>Pending</span>
						</span>
					</td>
				</tr>
				<tr className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50">
					<td className="p-3">
						<p>97412378923</p>
					</td>
					<td className="p-3">
						<p>Coca Cola co.</p>
					</td>
					<td className="p-3">
						<p>14 Jan 2022</p>
						<p className="text-gray-400 dark:text-gray-600">Friday</p>
					</td>
					<td className="p-3">
						<p>01 Feb 2022</p>
						<p className="text-gray-400 dark:text-gray-600">Tuesday</p>
					</td>
					<td className="p-3 text-right">
						<p>$8,950,500</p>
					</td>
					<td className="p-3 text-right">
						<span className="px-3 py-1 font-semibold rounded-md bg-violet-400 dark:bg-violet-600 text-gray-900 dark:text-gray-50">
							<span>Pending</span>
						</span>
					</td>
				</tr>
				<tr className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50">
					<td className="p-3">
						<p>97412378923</p>
					</td>
					<td className="p-3">
						<p>Nvidia Corporation</p>
					</td>
					<td className="p-3">
						<p>14 Jan 2022</p>
						<p className="text-gray-400 dark:text-gray-600">Friday</p>
					</td>
					<td className="p-3">
						<p>01 Feb 2022</p>
						<p className="text-gray-400 dark:text-gray-600">Tuesday</p>
					</td>
					<td className="p-3 text-right">
						<p>$98,218</p>
					</td>
					<td className="p-3 text-right">
						<span className="px-3 py-1 font-semibold rounded-md bg-violet-400 dark:bg-violet-600 text-gray-900 dark:text-gray-50">
							<span>Pending</span>
						</span>
					</td>
				</tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
