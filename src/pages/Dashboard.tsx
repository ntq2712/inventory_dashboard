import VehicleList from "../components/VehicleList";
import VehicleSummary from "../components/VehicleSummary";
import styles from "./dashboard.module.css";

function Dashboard() {
  return (
    <div className={styles.container}>
      <VehicleSummary />
      <div className={styles["vehicle-list-container"]}>
        <VehicleList />
      </div>
    </div>
  );
}

export default Dashboard;
