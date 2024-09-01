const axios = require("axios");

const baseUrl = "http://localhost:3000";

const testAggregation = async (city, startDate, endDate) => {
     try {
          const response = await axios.get(`${baseUrl}/cases/by-city`, {
               params: {
                    city,
                    startDate,
                    endDate,
               },
          });

          const data = response.data;
          console.log("response => ", data);
     } catch (error) {
          console.error("Error:", error);
     }
};

// testAggregation("Pune");
// testAggregation("Pune", '2024-09-02', '2024-09-04');

const testAggregationOnCity = async () => {
     const response = await axios.get(`${baseUrl}/cases/city-wise`);
     console.log("response = > ", response.data);
};

testAggregationOnCity()