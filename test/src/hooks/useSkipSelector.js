import { useState, useEffect, useMemo } from "react";
import { fetchSkipsByLocation } from "../api/skipService";
import { calculateMaxValues, filterSkips } from "../utils/skipUtils";

export default function useSkipSelector(initialLocation = { postcode: "NR32", town: "Lowestoft" }) {
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [skips, setSkips] = useState([]);
  const [filteredSkips, setFilteredSkips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000,
    minSize: 0,
    maxSize: 20,
  });
  const [currentStep, setCurrentStep] = useState(2);

  const location = useMemo(() => initialLocation, [initialLocation.postcode, initialLocation.town]);

  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 2000;

    const getSkips = async () => {
      if (!isMounted) return;

      setLoading(true);
      try {
        const data = await fetchSkipsByLocation(location.postcode, location.town);
        if (isMounted) {
          setSkips(data);
          setFilteredSkips(data);
          const { maxPrice, maxSize } = calculateMaxValues(data);
          setFilters({
            minPrice: 0,
            maxPrice: maxPrice || 1000,
            minSize: 0,
            maxSize: maxSize || 20,
          });
          setError(null);
        }
      } catch (err) {
        if (isMounted && retryCount < maxRetries) {
          console.warn(`Retrying fetchSkipsByLocation (${retryCount + 1}/${maxRetries})...`);
          retryCount++;
          setTimeout(() => getSkips(), retryDelay);
        } else if (isMounted) {
          console.error("Failed to fetch skips:", err);
          setError("Failed to load skip options. Please try again.");
          setSkips([]);
          setFilteredSkips([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getSkips();

    return () => {
      isMounted = false;
    };
  }, [location]);

  useEffect(() => {
    if (skips.length > 0) {
      const filtered = filterSkips(skips, filters);
      setFilteredSkips(filtered);
    } else {
      setFilteredSkips([]);
    }
  }, [skips, filters]);

  const resetFilters = () => {
    const { maxPrice, maxSize } = calculateMaxValues(skips);
    setFilters({
      minPrice: 0,
      maxPrice: maxPrice || 1000,
      minSize: 0,
      maxSize: maxSize || 20,
    });
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return {
    selectedSkip,
    setSelectedSkip,
    skips,
    filteredSkips,
    loading,
    error,
    showFilters,
    setShowFilters,
    filters,
    setFilters,
    resetFilters,
    currentStep,
    goToNextStep,
    goToPreviousStep,
  };
}
