import PropTypes from 'prop-types';
import '../../variables.css';
import styles from "./NavButton.module.css";

function NavButton(props) {

    return (
        <button className={styles.navButton}>{props.label}</button>
    );

}

NavButton.propTypes = {
    label: PropTypes.string
}

NavButton.defaultProps = {
    label: "NavButton"
}


export default NavButton;