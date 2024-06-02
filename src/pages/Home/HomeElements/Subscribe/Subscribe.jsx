import { MdEmail } from "react-icons/md";

export default function Subscribe() {
  return (
    <>
      <section className="bg-[#304561] pb-10">
        <section className="py-12 bg-[#3F72AF] px-2 md:px-4 flex flex-col lg:flex-row  items-start lg:items-center   gap-8 lg:gap-0  lg:justify-evenly ">
          <div className="flex gap-5 md:gap-16 items-center">
            <div className="flex gap-2 items-center">
              <MdEmail className="text-white text-4xl" />
              <h1 className="text-white font-semibold text-3xl">Newsletter</h1>
            </div>
            <div>
              <p className="text-white text-sm font-mono max-w-xs ">
                Sign up for stay updated on everything Hostel-Related
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2  ">
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-300"></label>

              <input
                type="email"
                placeholder="@example.com"
                className=" block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600  dark:text-gray-800 dark:focus:border-blue-300"
              />
            </div>
            <div>
              <button className="  border rounded-lg text-white block px-3 py-2  font-mono ">
                SIGN UP
              </button>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
