// Function to fetch Day-Ahead electricity prices from Fraunhofer ISE (Energy Charts)
async function getDayAheadPrices() {
  // Define the target bidding zone (NL for Netherlands, BE for Belgium, DE-LU for Germany/Luxembourg)
  const biddingZone = 'NL';
  
  // Construct the API endpoint URL (no API key or registration required)
  const url = `https://api.energy-charts.info/price?bzn=${biddingZone}`; 

  try {
    // Send asynchronous HTTP GET request to the Energy Charts API
    const response = await fetch(url);
    
    // Check if the response status is OK (HTTP 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the returned JSON payload
    const data = await response.json();
    
    // Extract timestamp array (Unix timestamps in seconds) and price array (EUR/MWh)
    const timestamps = data.unix_seconds;
    const prices = data.price;

    console.log(`Successfully fetched ${prices.length} price entries for bidding zone: ${biddingZone}`);

    // Map timestamps and prices into a clean structured array of hourly records
    const hourlyPrices = timestamps.map((timestamp, index) => {
      return {
        timestamp: new Date(timestamp * 1000).toISOString(),
        priceEurMWh: prices[index],
        priceEurKWh: prices[index] ? prices[index] / 1000 : null // Convert EUR/MWh to EUR/kWh
      };
    });

    // Output formatted sample records
    console.log('Sample Hourly Prices:', hourlyPrices.slice(0, 3));
    
    return hourlyPrices;
  } catch (error) {
    // Handle network errors or parsing exceptions
    console.error('Failed to fetch Day-Ahead prices from Energy Charts:', error.message);
  }
}

// Execute the function
getDayAheadPrices();

/**
# Direct execution via Node runtime
node my-app/src/scripts/fetch-prices.js 

# Navigate to script folder and execute
cd my-app/src/scripts
node fetch-prices.js
 */

/**
 * =========================================================================================
 *  Fraunhofer ISE (Energy Charts) API - Developer Notes & Field Specification
 * =========================================================================================
 * 
 *  1. API Endpoint:
 *     GET https://api.energy-charts.info/price?bzn={BIDDING_ZONE}
 * 
 *  2. Key Query Parameters:
 *     - bzn: The electricity bidding zone code (e.g., 'NL', 'BE', 'DE-LU', 'FR', 'AT').
 *     - start: Optional start time in ISO 8601 or UNIX timestamp format.
 *     - end: Optional end time in ISO 8601 or UNIX timestamp format.
 * 
 *  3. Response Structure:
 *     - unix_seconds: Array of UNIX timestamps representing the start of each market hour.
 *     - price: Array of wholesale prices in EUR per Megawatt-hour (EUR/MWh).
 *     - unit: Unit description string (typically "EUR/MWh").
 * 
 *  4. Conversion & Utilities:
 *     - Wholesale prices are published in EUR/MWh. Divide by 1000 to obtain base EUR/kWh.
 *     - Note that published day-ahead prices exclude local grid fees, energy taxes, and VAT.
 *     - Day-ahead prices for the following day are typically published daily around 13:00 CET.
 * 
 *  5. License & Rate Limits:
 *     - Free open data provided by Fraunhofer ISE. No registration or auth token needed.
 * =========================================================================================
 */

