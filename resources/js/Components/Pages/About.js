const { __ } = wp.i18n;
const { useCallback } = wp.element;
const { withSelect } = wp.data;
const { compose } = wp.compose;
import PropTypes from 'prop-types';

const About = ( props ) => {
    const { isAuthenticated } = props;

    return (
        <>
            <h1>Welcome!</h1>
            <p>So good to see you.</p>
        </>
    );
};

export default compose( [
    withSelect( ( select ) => {
        return {
            isAuthenticated: select( 'wordproof' ).getIsAuthenticated(),
        };
    } ),
] )( About );
