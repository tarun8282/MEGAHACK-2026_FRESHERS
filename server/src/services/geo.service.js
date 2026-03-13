const axios = require('axios');

/**
 * Reverse geocoding using Nominatim (OpenStreetMap).
 * @param {number} lat - Latitude.
 * @param {number} lng - Longitude.
 * @returns {Promise<Object>} - Address details.
 */
async function reverseGeocode(lat, lng) {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
            params: {
                lat,
                lon: lng,
                format: 'json',
                addressdetails: 1
            },
            headers: {
                'User-Agent': 'NagarSetu-Civic-Platform-Hackathon'
            }
        });

        const { address, display_name } = response.data;
        
        // Extract city and state from address
        const city = address.city || address.town || address.village || address.municipality || 'Unknown City';
        const state = address.state || 'Unknown State';

        return {
            fullAddress: display_name,
            city,
            state,
            rawAddress: address
        };
    } catch (error) {
        console.error('Geocoding Error:', error);
        // Fallback or rethrow depending on requirement
        return {
            fullAddress: `Location at ${lat}, ${lng}`,
            city: 'Unknown',
            state: 'Unknown'
        };
    }
}

module.exports = { reverseGeocode };
