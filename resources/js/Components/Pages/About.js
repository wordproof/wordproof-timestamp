const {__} = wp.i18n;
const {useCallback} = wp.element;
const {withSelect} = wp.data;
const {compose} = wp.compose;

import {
    __experimentalText as Text,
    __experimentalHeading as Heading,
} from '@wordpress/components';
import PropTypes from 'prop-types';

const About = (props) => {
    const {isAuthenticated} = props;

    return (
        <div className={'m-6'}>
            <Heading>WordProof is installed! 🎉</Heading>
            <p>So good to see you.</p>
        </div>
    );
};

export default compose([
    withSelect((select) => {
        return {
            isAuthenticated: select('wordproof').getIsAuthenticated(),
        };
    }),
])(About);
