import { lookup } from 'zipcodes'

export const findCity = (zipCode) => {
  try {
    const data = lookup(zipCode)
    return `${data.city}, ${data.state}`
  } catch {
    return "Seattle, WA"
  }
}
