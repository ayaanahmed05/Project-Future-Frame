import PropTypes from 'prop-types';
import '../../../variables.css';
import styles from "./SecondaryButton.module.css";

function SecondaryButton(props) {

    return (
        <button className={styles.SecondaryButton}>{props.label}</button>
    );

}

SecondaryButton.propTypes = {
    label: PropTypes.string
}

SecondaryButton.defaultProps = {
    label: "SecondaryButton"
}


export default SecondaryButton;
