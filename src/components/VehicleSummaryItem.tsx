import React from "react";
import styles from "./vehicleSummary.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface VehicleSummaryItemProps {
  title: string;
  value: string | number;
  positive: boolean;
  percentageChange?: number;
  children?: React.ReactNode;
}

function VehicleSummaryItem({
  title,
  value,
  positive,
  percentageChange = 0,
  children,
}: VehicleSummaryItemProps) {
  return (
    <div className={styles.item}>
      {children && children}
      <div className={styles.content}>
        <div className={styles.value}>{value}</div>
        <div className={styles.title}>{title}</div>
      </div>

      <div className={styles["change-indicator"]}>
        <div className={`${styles["change-value"]} ${positive ? styles.positive : styles.negative}`}>
          <div className={`${styles["change-percentage"]} ${positive ? styles.positive : styles.negative}`}>{percentageChange.toFixed(1)}%</div>
          {positive ? (
            <FaChevronUp className={styles['indicator-icon']} />
          ) : (
            <FaChevronDown className={styles['indicator-icon']} />
          )}
        </div>
        <div className={styles["change-description"]}>Since last month</div>
      </div>
    </div>
  );
}

export default VehicleSummaryItem;
