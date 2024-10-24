import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ScatterChart, Scatter, ResponsiveContainer, Legend } from 'recharts';
import fetchEVData from '../api'; // Assuming fetchEVData is the function that fetches the CSV data
import { FaCar, FaCheckCircle, FaChartBar, FaDollarSign } from 'react-icons/fa'; // Importing icons
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'; // Navigation icons
import Pagination from '../components/UI/Pagination';
import Chart from '../components/chart';
import PieChart from '../components/PiaChart';
import Table from '../components/UI/Table';

const ITEMS_PER_PAGE = 10; // Number of items to display per page

const EVDashboard = () => {
    const [evData, setEvData] = useState([]);
    const [filteredCity, setFilteredCity] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetchEVData().then((data) => {
            setEvData(data);
        });
    }, []);

    const filteredData = filteredCity ? evData.filter(item => item.city === filteredCity) : evData;
    console.log(filteredData);

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const displayedData = filteredData.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

    // Functions to calculate key stats
    const totalEVs = filteredData.length;
    const avgRange = totalEVs > 0
        ? Math.round(filteredData.reduce((acc, item) => acc + Number(item.electricRange || 0), 0) / totalEVs)
        : 0;
    const cafvCount = filteredData.filter(item => item.cafvEligibility === 'Yes').length;
    console.log(displayedData);

    // Calculate counts of each make
    const makeCounts = displayedData.reduce((acc, item) => {
        acc[item.make] = (acc[item.make] || 0) + 1;
        return acc;
    }, {});

    // Format data for PieChart
    const pieChartData = Object.keys(makeCounts).map(make => ({
        name: make,
        value: makeCounts[make],
    }));

    const evTypeCounts = displayedData.reduce((acc, item) => {
        acc[item.evType] = (acc[item.evType] || 0) + 1;
        return acc;
    }, {});
    console.log(evTypeCounts);

    const pieChartData2 = Object.keys(evTypeCounts).map(evType => ({
        name: evType,
        value: evTypeCounts[evType],
        percentage: ((evTypeCounts[evType] / displayedData.length) * 100).toFixed(2), // Calculate percentage
    }));
    const handleCityChange = (e) => {
        setFilteredCity(e.target.value);
        setCurrentPage(0);
    };
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF3399', '#B5B5B5'];
    const totlaMakes = new Set(displayedData.map((data) => data.make))
    return (
        <div className="container mx-auto p-4">
            <header className="mb-4">
            </header>
            <section className="mb-4 flex  px-6 justify-between items-center flex-row bg-slate-50 w-full rounded-lg py-4 text-center ">
                <h2 className="text-xl font-bold text-gray-800">Electric Vehicle Dashboard</h2>
                <div className='gap-1 flex '>

                    <select onChange={(e) => {
                        handleCityChange(e);
                    }} className="p-2 rounded border max-w-xs   shadow-md text-base font-normal">

                        <option value=""  >All Cities</option>
                        {Array.from(new Set(evData.map(item => item.city))).map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
            </section>
            {/* Key Metrics */}
            <section className="mb-4 grid md:grid-cols-4 sm:gr id-cols-2 gap-4">
                {/** Metric Box: Total EVs **/}
                <div className="metric-box bg-blue-100 hover:bg-blue-200 transition-colors duration-300 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-[1.02]">
                    <FaCar className="icon text-blue-500 text-2xl mb-2" />
                    <h2 className="font-bold text-lg">Total EVs</h2>
                    <p className="text-xl font-semibold">{totalEVs}</p>
                </div>

                {/** Metric Box: Avg Range **/}
                <div className="metric-box bg-green-100 hover:bg-green-200 transition-colors duration-300 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-[1.02]">
                    <FaCheckCircle className="icon text-green-500 text-2xl mb-2" />
                    <h2 className="font-bold text-lg">Avg Range</h2>
                    <p className="text-xl font-semibold">{avgRange} km</p>
                </div>

                {/** Metric Box: CAFV Eligible **/}
                <div className="metric-box bg-yellow-100 hover:bg-yellow-200 transition-colors duration-300 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-[1.02]">
                    <FaChartBar className="icon text-yellow-500 text-2xl mb-2" />
                    <h2 className="font-bold text-lg">Top EV make</h2>
                    <p className="text-xl font-semibold">{totlaMakes.size}</p>
                </div>

                {/** Metric Box: Price Range **/}
                <div className="metric-box bg-purple-100 hover:bg-purple-200 transition-colors duration-300 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-[1.02]">
                    <FaDollarSign className="icon text-purple-500 text-xl mb-2" />
                    <h2 className="font-bold text-base">Price Range</h2>
                    <p className="text-xl font-semibold">
                        {Math.round(Math.min(...filteredData.map(item => item.baseMsrp)))} -
                        {Math.round(Math.max(...filteredData.map(item => item.baseMsrp)))} USD
                    </p>
                </div>
            </section>




            {/* Charts Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50">
                <Chart
                    displayedData={displayedData} />

                <PieChart
                    pieChartData2={pieChartData2}
                    COLORS={COLORS} />
            </section>





            {/* Data Table */}
            <Table
                displayedData={displayedData} />

            {/* Pagination Controls */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />

        </div>
    );
};

export default EVDashboard;
