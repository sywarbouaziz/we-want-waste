import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import SkipGrid from "../../components/SkipGrid/SkipGrid";
import FooterNavigation from "../../components/FooterNavigation/FooterNavigation";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import Header from "../../components/Header/Header";
import useSkipSelector from "../../hooks/useSkipSelector";
import { calculateMaxValues } from "../../utils/skipUtils";
import styles from "./SkipSelector.module.css";
import { progressSteps } from "../../config/ProgressSteps";

export default function SkipSelectorPage({ initialLocation }) {
  const { isDarkMode } = useContext(ThemeContext);
  const {
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
  } = useSkipSelector(initialLocation);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      setShowLoading(true);
      const timer = setTimeout(() => setShowLoading(false), 500);
      return () => clearTimeout(timer);
    } else {
      setShowLoading(false);
    }
  }, [loading]);

  const handleSkipSelect = (skipId) => {
    setSelectedSkip(selectedSkip === skipId ? null : skipId);
  };

  const updatedProgressSteps = progressSteps.map((step, index) => ({
    ...step,
    completed: index < currentStep,
    active: index === currentStep,
  }));

  const { maxPrice, maxSize } = calculateMaxValues(skips);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setShowFilters(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
       case 0:
        return <div>Postcode Step</div>;
         case 1:
        return <div>Waste Type Step</div>;
      case 2:
        return (
          <div className={styles.stepContent}>
            <div className={styles.titleSection}>
              <h1 className={styles.title}>Choose Your Perfect Skip Size</h1>
              <p className={styles.subtitle}>
                Select the skip size that best matches your project needs. All prices include delivery and collection.
              </p>
              {filteredSkips.length > 0 && (
                <div className={styles.resultsInfo}>
                  <span>
                    {filteredSkips.length} skip{filteredSkips.length !== 1 ? "s" : ""} available
                  </span>
                </div>
              )}
            </div>
            {showLoading ? (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading skip options...</p>
              </div>
            ) : error ? (
              <div className={styles.error}>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className={styles.retryButton}>
                  Try Again
                </button>
              </div>
            ) : filteredSkips.length === 0 ? (
              <div className={styles.noResults}>
                <h3>No skips found</h3>
                <p>Try adjusting your filters or contact us for custom requirements.</p>
                <button onClick={resetFilters} className={styles.resetButton}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <SkipGrid
                skips={filteredSkips}
                selectedSkip={selectedSkip}
                handleSkipSelect={handleSkipSelect}
              />
            )}
          </div>
        );
      case 3:
        return <div>Permit Check Step</div>;
      case 4:
        return <div>Choose Date Step</div>;
      case 5:
        return <div>Payment Step</div>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <Header showFilters={showFilters} setShowFilters={setShowFilters} />
      <div className={styles.progressSection}>
        <ProgressBar steps={updatedProgressSteps} />
      </div>
      {showFilters && (
        <FilterPanel
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClose={() => setShowFilters(false)}
          maxPrice={maxPrice}
          maxSize={maxSize}
        />
      )}
      <main className={styles.main}>
        <div className={styles.content}>{renderStepContent()}</div>
      </main>
      <FooterNavigation
        selectedSkip={selectedSkip}
        skips={skips}
        onBack={goToPreviousStep}
        onContinue={goToNextStep}
      />
    </div>
  );
}
