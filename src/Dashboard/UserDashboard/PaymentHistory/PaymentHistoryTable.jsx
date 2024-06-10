/* eslint-disable react/prop-types */

export default function PaymentHistoryTable({ payment }) {
  return (
    <>
      <tr className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-[#F9F7F7]">
        <td className="p-3">
          <p>{payment?.date}</p>
        </td>
        <td className="p-3">{/* <p>Microsoft Corporation</p> */}</td>
        <td className="p-3">{payment?.transactionId} </td>
        <td className="p-3"> </td>
        <td className="p-3 ">
          <p>{payment?.badge}</p>
        </td>
        <td className="p-3 ">
          <span>${payment?.price}</span>
        </td>
      </tr>
    </>
  );
}
