const {__} = wp.i18n;
const {useCallback} = wp.element;
const {withSelect} = wp.data;
const {compose} = wp.compose;

import {
    Button,
    __experimentalText as Text,
    __experimentalHeading as Heading,
} from '@wordpress/components';
import PropTypes from 'prop-types';

const Migrate = (props) => {
        const {isAuthenticated} = props;

        const openAuthentication = useCallback((event) => {
            event.preventDefault();
            dispatch('wordproof:open_authentication');
        });

        return (
            <div className={'m-6'}>
                <Heading>Welcome to WordProof 3.0! 🎉</Heading>
                <Text>So good to on-board! We have worked hard on this version of the WordPress plugin. Some things you will
                    notice with the current version:</Text>
                <ol>
                    <ul>💅🏻 A completely redesigned certificate</ul>
                    <ul>📓 Schema.org markup for the timestamps</ul>
                    <ul>📓 Improved reliability of the plugin</ul>
                </ol>

                {!isAuthenticated &&
                <>
                    <Text>We do need to do some cleanup first. Start by authenticating with your WordProof account.</Text>
                    <Button onClick={openAuthentication} variant={'primary'}>Authenticate</Button>
                </>
                }

                {isAuthenticated &&
                <>
                    <Text>Nice job! You are authenticated with WordProof.</Text>
                </>
                }
            </div>
        );
    }
;

export default compose([
    withSelect((select) => {
            return {
                isAuthenticated: select('wordproof').getIsAuthenticated(),
            };
        }
    ),
])(Migrate);
