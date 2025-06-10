import { useState } from "react";
import { X, Sliders } from "lucide-react";
import styles from "./FilterPanel.module.css";

export default function FilterPanel({ filters, onFiltersChange, onClose, maxPrice, maxSize }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters = { minPrice: 0, maxPrice: maxPrice, minSize: 0, maxSize: maxSize };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
    onClose();
  };

  const handleInputChange = (field, value) => {
    const numValue = value === "" ? 0 : Math.round(Number(value));
    setLocalFilters({ ...localFilters, [field]: numValue });
  };

  return (
    <div className={styles.filterOverlay} onClick={onClose}>
      <div className={styles.filterPanel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.filterHeader}>
          <div className={styles.filterTitle}>
            <Sliders size={18} />
            <h3>Filter Skips</h3>
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.filterContent}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Price Range (£)</label>
            <div className={styles.rangeInputs}>
              <input
                type="number"
                placeholder="Min Price"
                value={localFilters.minPrice === 0 ? "" : localFilters.minPrice}
                onChange={(e) => handleInputChange("minPrice", e.target.value)}
                onFocus={(e) => e.target.select()}
                className={styles.rangeInput}
                min="0"
                step="1"
              />
              <span className={styles.rangeSeparator}>to</span>
              <input
                type="number"
                placeholder="Max Price"
                value={localFilters.maxPrice === maxPrice ? "" : localFilters.maxPrice}
                onChange={(e) => handleInputChange("maxPrice", e.target.value)}
                onFocus={(e) => e.target.select()}
                className={styles.rangeInput}
                min="0"
                step="1"
              />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Skip Size (Yards)</label>
            <div className={styles.rangeInputs}>
              <input
                type="number"
                placeholder="Min Size"
                value={localFilters.minSize === 0 ? "" : localFilters.minSize}
                onChange={(e) => handleInputChange("minSize", e.target.value)}
                onFocus={(e) => e.target.select()}
                className={styles.rangeInput}
                min="0"
                step="1"
              />
              <span className={styles.rangeSeparator}>to</span>
              <input
                type="number"
                placeholder="Max Size"
                value={localFilters.maxSize === maxSize ? "" : localFilters.maxSize}
                onChange={(e) => handleInputChange("maxSize", e.target.value)}
                onFocus={(e) => e.target.select()}
                className={styles.rangeInput}
                min="0"
                step="1"
              />
            </div>
          </div>
        </div>

        <div className={styles.filterActions}>
          <button onClick={handleResetFilters} className={styles.resetButton}>
            Reset
          </button>
          <button onClick={handleApplyFilters} className={styles.applyButton}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
