export interface TrainAlertData {
  stationName: string; // Station Name
  destination: string; // Destination Name
  arrivalTime: string; // Arrival Time
  route: string; // Route (e.g., Red, Blue)
  trainNumber: string; // Train number
}

export interface TrainETA {
  staId: string; // Station ID
  stpId: string; // Stop ID
  staNm: string; // Station Name
  stpDe: string; // Description of the Stop
  rn: string; // Train Number
  rt: string; // Route (e.g., Org for Orange Line)
  destSt: string; // Destination Stop ID
  destNm: string; // Destination Name
  trDr: string; // Train Direction (1 or 5)
  prdt: string; // Prediction Time (ISO format)
  arrT: string; // Arrival Time (ISO format)
  isApp: string; // Is Approaching (0 or 1)
  isSch: string; // Is Scheduled (0 or 1)
  isDly: string; // Is Delayed (0 or 1)
  isFlt: string; // Is Fault (0 or 1)
  flags: string | null; // Flags (null or string)
  lat: string; // Latitude
  lon: string; // Longitude
  heading: string; // Train Heading
}
