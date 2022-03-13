const {__} = wp.i18n;
const {useCallback, useEffect} = wp.element;
const {withSelect} = wp.data;
const {compose} = wp.compose;

import AuthenticationModals
    from "../../../../vendor/wordproof/wordpress-sdk/resources/js/components/AuthenticationModals";
import {dispatch} from "../../../../vendor/wordproof/wordpress-sdk/resources/js/helpers/event";
import initializeAuthentication from "../../../../vendor/wordproof/wordpress-sdk/resources/js/initializers/authentication";

import {
    __experimentalHeading as Heading,
    Button,
    Notice,
} from '@wordpress/components';
import PropTypes from 'prop-types';

const About = (props) => {

    useEffect(() => {
        initializeAuthentication();
    }, []);

    const {isAuthenticated} = props;

    const openAuthentication = useCallback((event) => {
        event.preventDefault();
        dispatch('wordproof:open_authentication');
    });

    const openSettings = useCallback((event) => {
        event.preventDefault();
        dispatch('wordproof:open_settings');
    });

    return (
        <div className={'mt-6'}>
            <Notice isDismissible={false} status={'info'} className={'mb-6 mx-0'}>If you are upgrading from WordProof
                Timestamp v2 you will be automatically signed in
                when authenticating with WordProof.</Notice>

            <Heading>WordProof is installed! 🎉</Heading>

            {!isAuthenticated && <>

                <p>We just need to do one more thing. Using the button below, register a new account or log-in with
                    your existing account. After authentication you are ready to timestamp your posts and pages.</p>


                <Button variant={'primary'} onClick={openAuthentication}>Authenticate with WordProof</Button>

            </>}

            {isAuthenticated && <>

                <p>You are authenticated with WordProof! You can change your settings below or start timestamping
                    your posts and pages.</p>

                <Button variant={'primary'} onClick={openSettings}>Change your settings</Button>

            </>}

            <AuthenticationModals/>

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
