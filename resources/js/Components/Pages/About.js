const {__} = wp.i18n;
const {useCallback, useEffect} = wp.element;
const {withSelect} = wp.data;
const {compose} = wp.compose;

import AuthenticationModals
    from "../../../../vendor/wordproof/wordpress-sdk/resources/js/components/AuthenticationModals";
import {dispatchOpenAuthenticationEvent, dispatchOpenSettingsEvent} from "../../../../vendor/wordproof/wordpress-sdk/resources/js/helpers/event";
import initializeAuthentication
    from "../../../../vendor/wordproof/wordpress-sdk/resources/js/initializers/authentication";

import {
    __experimentalHeading as Heading,
    Button,
} from '@wordpress/components';
import PropTypes from 'prop-types';

const About = (props) => {

        useEffect(() => {
            initializeAuthentication();
        }, []);

        const {isAuthenticated} = props;

        const openAuthentication = useCallback((event) => {
            event.preventDefault();
            dispatchOpenAuthenticationEvent();
        });

        const openSettings = useCallback((event) => {
            event.preventDefault();
            dispatchOpenSettingsEvent();
        });

        return (
            <div className={'mt-6'}>

                <Heading>{__('WordProof is installed', 'wordproof')} 🎉</Heading>

                {!isAuthenticated && <>

                    <p class={'max-w-xl'}>{__('We just need to do one more thing. Using the button below, register a new account or log-in with your existing account. After authentication you are ready to timestamp your posts and pages.', 'wordproof')}</p>

                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z"/></svg>

                    <Button variant={'primary'} onClick={openAuthentication}>
                        <svg style={{ marginRight: '6px' }} fill="#fff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="15px" height="15px"><path d="M 25.980469 2.9902344 A 1.0001 1.0001 0 0 0 25.869141 3 L 20 3 A 1.0001 1.0001 0 1 0 20 5 L 23.585938 5 L 13.292969 15.292969 A 1.0001 1.0001 0 1 0 14.707031 16.707031 L 25 6.4140625 L 25 10 A 1.0001 1.0001 0 1 0 27 10 L 27 4.1269531 A 1.0001 1.0001 0 0 0 25.980469 2.9902344 z M 6 7 C 4.9069372 7 4 7.9069372 4 9 L 4 24 C 4 25.093063 4.9069372 26 6 26 L 21 26 C 22.093063 26 23 25.093063 23 24 L 23 14 L 23 11.421875 L 21 13.421875 L 21 16 L 21 24 L 6 24 L 6 9 L 14 9 L 16 9 L 16.578125 9 L 18.578125 7 L 16 7 L 14 7 L 6 7 z"/></svg>
                         {__('Authenticate with WordProof', 'wordproof')}
                    </Button>

                </>}

                {isAuthenticated && <>

                    <p class={'max-w-xl'}>{__('You are authenticated with WordProof! You can change your settings below or start timestamping your posts and pages.', 'wordproof')}</p>


                    <Button variant={'primary'} onClick={openSettings}>
                        <svg style={{ marginRight: '6px' }} fill="#fff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="15px" height="15px"><path d="M 25.980469 2.9902344 A 1.0001 1.0001 0 0 0 25.869141 3 L 20 3 A 1.0001 1.0001 0 1 0 20 5 L 23.585938 5 L 13.292969 15.292969 A 1.0001 1.0001 0 1 0 14.707031 16.707031 L 25 6.4140625 L 25 10 A 1.0001 1.0001 0 1 0 27 10 L 27 4.1269531 A 1.0001 1.0001 0 0 0 25.980469 2.9902344 z M 6 7 C 4.9069372 7 4 7.9069372 4 9 L 4 24 C 4 25.093063 4.9069372 26 6 26 L 21 26 C 22.093063 26 23 25.093063 23 24 L 23 14 L 23 11.421875 L 21 13.421875 L 21 16 L 21 24 L 6 24 L 6 9 L 14 9 L 16 9 L 16.578125 9 L 18.578125 7 L 16 7 L 14 7 L 6 7 z"/></svg>
                         {__('Edit settings', 'wordproof')}
                    </Button>
                </>}

                <AuthenticationModals/>

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
])(About);
