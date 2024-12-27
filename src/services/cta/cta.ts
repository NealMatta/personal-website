import { TrainETA, TrainAlertData } from '@/src/types/cta';
export async function getChicagoRedLineStatus(): Promise<TrainAlertData[]> {
  const ctaAccessToken = process.env.CTA_TRACKER;

  try {
    const ctaRequestEndpoint =
      'https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=' +
      ctaAccessToken +
      '&mapid=41450&max=4&outputType=JSON';

    // Fetch data
    const response = await fetch(ctaRequestEndpoint);

    // Check if response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse JSON data
    const data = await response.json();

    // Extract the `eta` array from the response
    const etaData = data.ctatt.eta;

    // Return the processed data
    return etaData.map((train: TrainETA) => ({
      stationName: train.staNm,
      destination: train.destNm,
      arrivalTime: train.arrT,
      route: train.rt,
      trainNumber: train.rn,
    }));
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Re-throw for higher-level handling
  }
}
