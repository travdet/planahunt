import SunCalc from "suncalc";

/**
 * Gets sunrise, sunset, and legal shooting hours for a given location and date.
 * Legal hours are 30 mins before sunrise to 30 mins after sunset.
 */
export function getSunriseSunset(lat: number, lng: number, date: Date) {
  try {
    const times = SunCalc.getTimes(date, lat, lng);
    
    // Legal shooting hours (30 min before/after)
    const legalStart = new Date(times.sunrise.getTime() - 30 * 60000);
    const legalEnd = new Date(times.sunset.getTime() + 30 * 60000);

    // Helper to format time as "6:30 AM"
    const format = (d: Date) => 
      d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

    return {
      sunrise: format(times.sunrise),
      sunset: format(times.sunset),
      legalStart: format(legalStart),
      legalEnd: format(legalEnd),
    };
  } catch (e) {
    console.error("SunCalc error:", e);
    return null;
  }
}
