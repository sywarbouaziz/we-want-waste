import { ArrowLeft, ArrowRight } from "lucide-react"
import styles from "./FooterNavigation.module.css"

export default function FooterNavigation({ selectedSkip, skips, onBack, onContinue }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerDisclaimer}>
        <p>
          Imagery and information shown throughout this website may not reflect the exact shape or size specification,
          colours may vary, options and/or accessories may be featured at additional cost.
        </p>
      </div>
      <div className={styles.footerContent}>
        <button className={styles.backButton} onClick={onBack}>
          <ArrowLeft size={16} />
          Back
        </button>
        <div className={styles.selectedInfo}>
          {selectedSkip && (
            <span>
              {skips.find((s) => s.id === selectedSkip)?.name} - £
              {skips.find((s) => s.id === selectedSkip)?.price.toFixed(2)}
              {skips.find((s) => s.id === selectedSkip)?.hirePeriod && (
                <span> | {skips.find((s) => s.id === selectedSkip)?.hirePeriod}</span>
              )}
            </span>
          )}
        </div>
        <button
          className={`${styles.continueButton} ${selectedSkip ? styles.enabled : styles.disabled}`}
          disabled={!selectedSkip}
          onClick={onContinue}
        >
          Continue
          <ArrowRight size={16} />
        </button>
      </div>
    </footer>
  )
}