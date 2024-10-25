import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const PiaChart = ({ pieChartData2, COLORS }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-bold mb- text-gray-800 text-center">Top EV Types</h2>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        legendType='circle'

                        data={pieChartData2}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#6366F1"
                        label={({ name, value }) => ` ${value}%`}
                    >
                        {pieChartData2.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>

                    <Tooltip formatter={(value, name) => [`${value} Vehicles`, `${name}`]} />
                </PieChart>
            </ResponsiveContainer>

            {/* Legend Section */}
            <div className="mt grid grid-cols-2 gap-x-3 w-full ">
                {pieChartData2.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center">
                        <span
                            className="block w-4 h-3.5 rounded-full mr-2"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></span>
                        <span className="text-sm text-gray-700">{entry.name}: {entry.value} Vehicles</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PiaChart