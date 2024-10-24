import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const Chart = ({ displayedData }) => {


    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-h-[400px] flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">EVs by ElectricRange</h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart

                    data={displayedData} // Your existing data
                    margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="year" tick={{ fill: '#555', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#555', fontSize: 12 }} />
                    <Tooltip />
                    <Legend type='circle' />

                    <Bar
                        dataKey="count"
                        fill="#10B981"
                        radius={[16, 16, 0, 0]} // Rounded corners for bars
                        barSize={20}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
export default Chart;
