export const calculateMaxValues = (skips) => {
  const maxPrice = Math.max(...skips.map((skip) => skip.price || 0))
  const maxSize = Math.max(...skips.map((skip) => Number.parseInt(skip.size?.replace(/\D/g, "") || "0", 10) || 0))
  return { maxPrice, maxSize }
}

export const filterSkips = (skips, filters) => {
  return skips.filter((skip) => {
    if (!skip || typeof skip.size !== "string") {
      console.warn("Invalid skip size detected:", skip)
      return false
    }
    const sizeNum = Number.parseInt(skip.size.replace(/\D/g, ""), 10) || 0
    const passesFilters =
      skip.price >= filters.minPrice &&
      skip.price <= filters.maxPrice &&
      sizeNum >= filters.minSize &&
      sizeNum <= filters.maxSize
    console.log("Skip:", skip, "Passes filters:", passesFilters)
    return passesFilters
  })
}