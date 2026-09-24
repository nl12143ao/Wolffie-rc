
npm install entsoe-api-client

import { EntsoeApiClient, Area } from 'entsoe-api-client';

// Async function to request day-ahead electricity market prices from ENTSO-E
async function fetchEntsoePrices() {
  // Retrieve API token from environment variables or set your key here
  const apiToken = process.env.ENTSOE_SECURITY_TOKEN || 'YOUR_ENTSOE_SECURITY_TOKEN';

  // Initialize the ENTSO-E API client instance
  const client = new EntsoeApiClient({
    securityToken: apiToken
  });

  // Define period range (e.g., today 00:00 to tomorrow 23:59 UTC)
  const startPeriod = new Date();
  startPeriod.setHours(0, 0, 0, 0);

  const endPeriod = new Date();
  endPeriod.setDate(endPeriod.getDate() + 1);
  endPeriod.setHours(23, 59, 59, 999);

  try {
    console.log('Querying ENTSO-E Transparency Platform...');

    // Fetch Day-Ahead market prices for specified bidding zone (e.g., Netherlands)
    const rawData = await client.getDayAheadPrices({
      inDomain: Area.NL,      // Target bidding zone: NL (Area.NL), BE (Area.BE_N / Area.BE)
      outDomain: Area.NL,
      periodStart: startPeriod,
      periodEnd: endPeriod
    });

    // Check if valid data array was returned
    if (!rawData || !Array.isArray(rawData)) {
      throw new Error('No valid price data records returned from ENTSO-E API');
    }

    // Parse and normalize the XML-derived JSON data into clean objects
    const formattedPrices = rawData.map(entry => {
      const priceMw = parseFloat(entry.price);
      return {
        timestamp: entry.timestamp,
        priceEurMWh: priceMw,
        priceEurKWh: priceMw ? priceMw / 1000 : null // Convert MWh to kWh base
      };
    });

    console.log(`Successfully retrieved ${formattedPrices.length} hourly price records.`);
    console.log('Sample data output:', formattedPrices.slice(0, 3));

    return formattedPrices;
  } catch (error) {
    // Handle network errors, authentication failures, or parsing errors
    console.error('Error fetching ENTSO-E Day-Ahead prices:', error.message);
  }
}

// Execute demo
fetchEntsoePrices();

/**
# Set token via environment variable (recommended) and execute script
$env:ENTSOE_SECURITY_TOKEN="jouw-api-token-hier"
node demo-entso.js

Via npm run (as script in package.json):
Add to package.json:
{
  "name": "day-ahead-prices-module",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "demo": "node demo-entso.js"
  }
}
npm run demo:entso
 */

/**
 * =========================================================================================
 *  ENTSO-E Transparency Platform API - Developer Notes & Requirements
 * =========================================================================================
 * 
 *  1. Authentication & Security:
 *     - Requires a valid REST Security Token issued by ENTSO-E.
 *     - Request access by emailing transparency@entsoe.eu with subject "Restful API access".
 * 
 *  2. Area Identification (EIC Codes):
 *     - Netherlands (NL): Area.NL (EIC: 10YNL----------L)
 *     - Belgium (BE): Area.BE_N / Area.BE (EIC: 10YBE----------2)
 *     - Germany/Luxembourg: Area.DE_LU (EIC: 10Y1001A1001A82H)
 * 
 *  3. Data Document Type:
 *     - Query Type: A44 (Day-ahead Prices)
 *     - Resolution: PT60M (Hourly market interval for most European zones)
 * 
 *  4. Native Format & Conversion:
 *     - Native API delivers data in XML standard format.
 *     - entsoe-api-client automatically transforms XML TimeSeries into JavaScript objects.
 *     - Output unit is EUR/MWh. Divide by 1000 for standard wholesale EUR/kWh.
 * =========================================================================================
 */
