import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, ...props }) => children({ ...props });
Button.propTypes = { children: PropTypes.func.isRequired };

export default Button;
