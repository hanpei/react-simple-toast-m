import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ children, ...props }) => children({ ...props });
Content.propTypes = { children: PropTypes.func.isRequired };

export default Content;