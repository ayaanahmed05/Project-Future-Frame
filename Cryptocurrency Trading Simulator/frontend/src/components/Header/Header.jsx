import styles from "./Header.module.css";
import PrimaryButton from "../Buttons/Primary Button/PrimaryButton";
import NavButton from "../Buttons/Nav Button/NavButton";


function Header() {
    const navButtons = ["Home", "Dashboard", "Market", "Portfolio"];
    const isLoggedIn = false;

    return (
        <nav className={styles.headerContainer} aria-label="Main Navigation">
            <div>
                <p className={styles.companyName}>CryptoTrader</p>
            </div>

            {/* Nav Buttons, Login Button */}
            <ul className={styles.navButtonsContainer}>

                {/* Generates HTML code based off navButtons */}
                {navButtons.map((arrayItem, index) => (
                    <li key={index}>
                        <NavButton label={arrayItem} />
                    </li>
                ))}

                {/* Renders either a login button or a account button based off of IsLoggedIn */}
                {isLoggedIn ? <li><p>Logged in</p></li> : <li><PrimaryButton label="Login"/></li>}
            </ul>
        </nav>
    );
}

export default Header;