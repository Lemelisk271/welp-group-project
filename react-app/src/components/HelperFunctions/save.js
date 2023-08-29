export const findCity = async (zipCode) => {
  let newcode = 98051
  const url = `https://api.zippopotam.us/us/${newcode}`
  const info = await fetch(url)
  const data = await info.json()
  const city = `${data.places[0]['place name']}, ${data.places[0]['state abbreviation']}`
  return city
}
