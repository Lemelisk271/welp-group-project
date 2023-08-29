export const findCity = async (zipCode) => {
  try {
    const info = await fetch(`https://api.zippopotam.us/us/${zipCode}`)
    const data = await info.json()
    const city = `${data.places[0]['place name']}, ${data.places[0]['state abbreviation']}`
    return city
  } catch {
    return "Seattle, WA"
  }
}
