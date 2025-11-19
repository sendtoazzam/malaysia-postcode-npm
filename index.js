/**
 * Malaysia Postcodes
 * A comprehensive list of Malaysia postcodes with city and state information
 */

const all = require('./all.json');
const johor = require('./johor.json');
const kedah = require('./kedah.json');
const kelantan = require('./kelantan.json');
const kualaLumpur = require('./kuala_lumpur.json');
const labuan = require('./labuan.json');
const melaka = require('./melaka.json');
const negeriSembilan = require('./negeri_sembilan.json');
const pahang = require('./pahang.json');
const perak = require('./perak.json');
const perlis = require('./perlis.json');
const pulauPinang = require('./pulau_pinang.json');
const putrajaya = require('./putrajaya.json');
const sabah = require('./sabah.json');
const sarawak = require('./sarawak.json');
const selangor = require('./selangor.json');
const terengganu = require('./terengganu.json');

/**
 * Get all postcodes from all states
 * @returns {Object} All postcodes data
 */
function getAll() {
  return all;
}

/**
 * Get postcodes by state name
 * @param {string} stateName - Name of the state (e.g., 'Johor', 'Selangor')
 * @returns {Object|null} State postcode data or null if not found
 */
function getByState(stateName) {
  const stateMap = {
    'johor': johor,
    'kedah': kedah,
    'kelantan': kelantan,
    'kuala lumpur': kualaLumpur,
    'kuala_lumpur': kualaLumpur,
    'labuan': labuan,
    'melaka': melaka,
    'negeri sembilan': negeriSembilan,
    'negeri_sembilan': negeriSembilan,
    'pahang': pahang,
    'perak': perak,
    'perlis': perlis,
    'pulau pinang': pulauPinang,
    'pulau_pinang': pulauPinang,
    'penang': pulauPinang,
    'putrajaya': putrajaya,
    'sabah': sabah,
    'sarawak': sarawak,
    'selangor': selangor,
    'terengganu': terengganu
  };

  const normalizedName = stateName.toLowerCase().trim();
  return stateMap[normalizedName] || null;
}

/**
 * Search for postcode in all states
 * @param {string} postcode - Postcode to search for
 * @returns {Array} Array of objects containing state, city, and postcode information
 */
function searchByPostcode(postcode) {
  const results = [];
  const postcodeStr = String(postcode).trim();

  if (!all.state || !Array.isArray(all.state)) {
    return results;
  }

  all.state.forEach(state => {
    if (state.city && Array.isArray(state.city)) {
      state.city.forEach(city => {
        if (city.postcode && Array.isArray(city.postcode)) {
          if (city.postcode.includes(postcodeStr)) {
            results.push({
              state: state.name,
              city: city.name,
              postcode: postcodeStr
            });
          }
        }
      });
    }
  });

  return results;
}

/**
 * Get all cities for a specific state
 * @param {string} stateName - Name of the state
 * @returns {Array|null} Array of city names or null if state not found
 */
function getCitiesByState(stateName) {
  const state = getByState(stateName);
  if (!state || !state.city || !Array.isArray(state.city)) {
    return null;
  }
  return state.city.map(city => city.name);
}

/**
 * Get all postcodes for a specific city in a state
 * @param {string} stateName - Name of the state
 * @param {string} cityName - Name of the city
 * @returns {Array|null} Array of postcodes or null if not found
 */
function getPostcodesByCity(stateName, cityName) {
  const state = getByState(stateName);
  if (!state || !state.city || !Array.isArray(state.city)) {
    return null;
  }

  const city = state.city.find(c => 
    c.name.toLowerCase() === cityName.toLowerCase()
  );

  return city ? city.postcode : null;
}

module.exports = {
  all,
  johor,
  kedah,
  kelantan,
  kualaLumpur,
  labuan,
  melaka,
  negeriSembilan,
  pahang,
  perak,
  perlis,
  pulauPinang,
  putrajaya,
  sabah,
  sarawak,
  selangor,
  terengganu,
  getAll,
  getByState,
  searchByPostcode,
  getCitiesByState,
  getPostcodesByCity
};

