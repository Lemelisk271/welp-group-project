import { createContext, useState } from "react";

export const SearchContext = createContext()

export const SearchProvider = props => {
  const [currentSearch, setCurrentSearch] = useState('')

  return (
    <SearchContext.Provider value={{currentSearch, setCurrentSearch}}>
      {props.children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
