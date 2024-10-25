import { csv } from 'd3-fetch';

const fetchEVData = async () => {
    const data = await csv('/Electric_Vehicle_Population_Data.csv');
    const flattenedData = data.map((item) => ({
        vin: item["VIN (1-10)"],
        county: item.County,
        city: item.City,
        state: item.State,
        postalCode: item["Postal Code"],
        modelYear: item["Model Year"],
        make: item.Make,
        model: item.Model,
        evType: item["Electric Vehicle Type"],
        electricRange: item["Electric Range"],
        cafvEligibility: item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"],
        baseMsrp: item["Base MSRP"],
        electricUtility: item["Electric Utility"],
    }));
    return flattenedData;
}
export default fetchEVData 