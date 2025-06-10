import styles from "./ProgressBar.module.css"

export default function ProgressBar({ steps }) {
  return (
    <div className={styles.progressContainer}>
      {steps.map((step, index) => (
        <div key={step.label} className={styles.progressStep}>
          <div
            className={`${styles.progressIcon} ${
              step.completed ? styles.completed : step.active ? styles.active : styles.pending
            }`}
          >
            <step.icon size={16} />
          </div>
          <span className={styles.progressLabel}>{step.label}</span>
          {index < steps.length - 1 && (
            <div className={`${styles.progressLine} ${step.completed ? styles.completed : ""}`} />
          )}
        </div>
      ))}
    </div>
  )
}