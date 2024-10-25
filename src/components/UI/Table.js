import React from 'react'

const Table = ({ displayedData }) => {
    return (
        <section className="mt-4">
            <h2 className="text-xl mb-2">EV Details</h2>
            <div className='w-full overflow-y-auto max-w-full '>

                <table className="min-w-full bg-white  rounded-lg shadow-md  ">
                    <thead>
                        <tr className=' g bg-slate-300 '>
                            <th className="border border-gray-200 p-2 rounded-tl-lg  ">VIN</th>
                            <th className="border border-gray-200 p-2   ">City</th>
                            <th className="border border-gray-200 p-2">Make</th>
                            <th className="border border-gray-200 p-2">Model</th>
                            <th className="border border-gray-200 p-2">Model Year</th>
                            <th className="border border-gray-200 p-2">Electric Range</th>
                            <th className="border border-gray-200 p-2 rounded-tr-lg">Ev Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border border-gray-200 p-2">{item.vin}</td>

                                <td className="border border-gray-200 p-2">{item.city}</td>
                                <td className="border border-gray-200 p-2">{item.make}</td>
                                <td className="border border-gray-200 p-2">{item.model}</td>
                                <td className="border border-gray-200 p-2">{item.modelYear}</td>
                                <td className="border border-gray-200 p-2">{item.electricRange}</td>
                                <td className="border border-gray-200 p-2">{item.evType}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Table