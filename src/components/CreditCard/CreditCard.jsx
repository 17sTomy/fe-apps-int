import PropTypes from 'prop-types';
import './CreditCard.styles.scss';
import MastercardLogo from '../../assets/mastercard-logo.svg';
import { motion } from 'framer-motion';

export const CreditCard = (props) => {
  const { cardName, cardNumber, expirationDate } = props;

  return (
    <motion.div
      initial={{ rotateY: 180 }}
      animate={{ rotateY: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className="credit-card">
      <div className="internal-container">
        <div className="top-container">
          <p>
            <span>Credit</span> Card
          </p>
          <div className="logo">
            {cardNumber.trim().length === 16 && <img src={MastercardLogo} alt="mastercard" />}
          </div>
        </div>
        <div className="center-container">
          <div className="number-container">
            <p className="number-tooltip">Número de tarjeta</p>
            <p className="number">
              {[...cardNumber].map((number, index) => (
                <span key={index} style={{ marginLeft: index % 4 === 0 && index !== 0 ? 6 : 0 }}>
                  {number}
                </span>
              ))}
            </p>
          </div>
          <div className="extra-container">
            <p className="name">{cardName}</p>
            <p className="date">{expirationDate}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

CreditCard.propTypes = {
  cardNumber: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  expirationDate: PropTypes.string.isRequired,
};
