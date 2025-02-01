import styles from "./Header.module.css"


function Header() {
    return(

        <div className={styles.header}>
            <div>
                <h1>Cryptocurrency Trading Simulator</h1>
            </div>
            <div>
                <button className={styles.headerButton}>Dashboard</button>
                <button className={styles.headerButton}>Market</button>
                <button className={styles.headerButton}>Trading</button>
            </div>
        </div>
    );
}

export default Header;