import PropTypes from 'prop-types';
import '../../variables.css';
import styles from "./PrimaryButton.module.css";

function PrimaryButton(props) {

    return (
        <button className={styles.primaryButton}>{props.label}</button>
    );

}

PrimaryButton.propTypes = {
    label: PropTypes.string
}


export default PrimaryButton;
