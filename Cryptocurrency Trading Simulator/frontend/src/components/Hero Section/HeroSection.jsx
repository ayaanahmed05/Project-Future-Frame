import styles from "./HeroSection.module.css";
import HeroLogo from "../../assets/Hero-Logo.svg";
import PrimaryButton from "../Buttons/Primary Button/PrimaryButton.jsx"
import SecondaryButton from "../Buttons/Secondary Button/SecondaryButton.jsx";

function HeroSection() {
    return (
        <div className={styles.background}>
            <div className={styles.contentContainer}>
                <h1>The Easiest Way to learn Crypto Trading</h1>
                <p>Start paper trading in minutes with zero fees. Perfect your trading strategies and track your performance in real time.</p>

                <div className={styles.buttonContainer}>
                    <PrimaryButton label="Get Started" />
                    <SecondaryButton label="Learn More" />
                </div>
            </div>
            <div className={styles.illustration}>
                <img src={HeroLogo} alt="Illustration"/>
            </div>
        </div>
    );
}

export default HeroSection;