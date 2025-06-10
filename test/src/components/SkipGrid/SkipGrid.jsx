"use client"

import { Check, Ban } from "lucide-react"
import styles from "./SkipGrid.module.css"

export default function SkipGrid({ skips, selectedSkip, handleSkipSelect }) {
  return (
    <div className={styles.skipGrid}>
      {skips.map((skip) => (
        <div
          key={skip.id}
          className={`${styles.skipCard} ${selectedSkip === skip.id ? styles.selected : ""}`}
          onClick={() => handleSkipSelect(skip.id)}
        >
          {!skip.allowedOnRoad && (
            <div className={styles.restrictionBadge}>
              <div className={styles.badgeIcon}>
                <Ban size={16} />
              </div>
              <div className={styles.badgeContent}>
                <span className={styles.badgeTitle}>Road Restricted</span>
                <span className={styles.badgeSubtext}>Permit Required</span>
              </div>
            </div>
          )}
          <div className={styles.skipImageContainer}>
            <img
              src={skip.image || "/placeholder.svg?height=180&width=300"}
              alt={skip.name}
              className={styles.skipImage}
            />
            <div className={styles.sizeLabel}>{skip.size}</div>
          </div>
          <div className={styles.skipInfo}>
            <h3 className={styles.skipName}>{skip.name}</h3>
            <p className={styles.skipCapacity}>{skip.capacity}</p>
            <p className={styles.hirePeriod}>{skip.hirePeriod}</p>
            <p className={styles.wasteInfo}>
              {skip.allowsHeavyWaste ? "Suitable for heavy waste" : "Not for heavy waste"}
            </p>
            <div className={styles.priceSection}>
              <span className={styles.price}>£{skip.price.toFixed(2)}</span>
              <span className={styles.priceNote}>inc. VAT</span>
            </div>
            <button
              className={`${styles.selectButton} ${selectedSkip === skip.id ? styles.selected : ""}`}
              onClick={(e) => {
                e.stopPropagation()
                handleSkipSelect(skip.id)
              }}
            >
              {selectedSkip === skip.id ? (
                <>
                  <Check size={16} />
                  Selected
                </>
              ) : (
                "Select This Skip"
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}