export const findCity = async (zipCode) => {
  const info = await fetch(`http://api.zippopotam.us/us/${zipCode}`)
  const data = await info.json()
  const city = `${data.places[0]['place name']}, ${data.places[0]['state abbreviation']}`
  return city
}
