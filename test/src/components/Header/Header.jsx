import { useContext } from "react";
import { Filter, Recycle, Sun, Moon } from "lucide-react";
import styles from "./Header.module.css";
import { ThemeContext } from "../../context/ThemeContext";

export default function Header({ showFilters, setShowFilters }) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Recycle className={styles.logoIcon} size={24} />
          <span>WEWANTWASTE</span>
        </div>
        <div className={styles.headerActions}>
          <button
            className={`${styles.filterToggle} ${showFilters ? styles.active : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            <span>Filters</span>
          </button>
          <button className={styles.themeToggle} onClick={toggleTheme}>
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
