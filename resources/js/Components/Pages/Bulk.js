const {__} = wp.i18n;
const {useCallback, useEffect, useState} = wp.element;
const {withSelect} = wp.data;
const {compose} = wp.compose;
const {xor} = lodash;
import {CheckboxControl, Spinner} from '@wordpress/components';

import AuthenticationModals
    from "../../../../vendor/wordproof/wordpress-sdk/resources/js/components/AuthenticationModals";
import {dispatch} from "../../../../vendor/wordproof/wordpress-sdk/resources/js/helpers/event";
import initializeAuthentication
    from "../../../../vendor/wordproof/wordpress-sdk/resources/js/initializers/authentication";
import {postTimestampRequest} from "../../../../vendor/wordproof/wordpress-sdk/resources/js/helpers/endpoints";
import {getData} from "../../../../vendor/wordproof/wordpress-sdk/resources/js/helpers/data";
import {wait} from "../../../../vendor/wordproof/wordpress-sdk/resources/js/helpers/wait";

import {
    __experimentalHeading as Heading,
    Button,
    Notice,
} from '@wordpress/components';
import PropTypes from 'prop-types';

const Bulk = (props) => {

    useEffect(() => {
        initializeAuthentication();
    }, []);

    const {isAuthenticated} = props;

    const postTypes = getData('post_types');

    const [selectedPostTypes, setSelectedPostTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [progressCount, setProgressCount] = useState(0);

    const openAuthentication = useCallback((event) => {
        event.preventDefault();
        dispatch('wordproof:open_authentication');
    });

    const openSettings = useCallback((event) => {
        event.preventDefault();
        dispatch('wordproof:open_settings');
    });

    const startTimestamping = useCallback(async (event) => {
        event.preventDefault();

        setLoading(true);

        let postIds = [];

        selectedPostTypes.forEach((postType) => {
            const data = postTypes[postType];
            postIds = postIds.concat(data.postIds);
        });

        setTotalCount(postIds.length);

        let count = 0;
        for (const id of postIds) {
            count++;
            setProgressCount(count);

            postTimestampRequest(id);
            
            await wait(1000);
        }

        setLoading(false);
    });


    const getToggles = useCallback(() => {

        return Object.entries(postTypes).map(([postType, data]) => {
            return <CheckboxControl
                label={postType + ' (' + data.count + ')'}
                // checked={ isChecked }
                onChange={() => {
                    toggle(postType)
                }
                }
            />
        })
    });

    function toggle(postType) {
        setSelectedPostTypes(xor(selectedPostTypes, [postType]));
    }

    return (
        <div className={'mt-6'}>
            <Heading>Bulk timestamper</Heading>

            {!isAuthenticated && <>

                <p>We just need to do one more thing. Using the button below, register a new account or log-in with
                    your existing account. After authentication you are ready to timestamp your posts and pages.</p>


                <Button variant={'primary'} onClick={openAuthentication}>Authenticate with WordProof</Button>

            </>}

            {isAuthenticated && <>

                <p>Start timestamping all of your posts. You can select what post types you want to start with.</p>

                {getToggles()}

                <Button variant={'primary'} onClick={startTimestamping} disabled={loading}>Start timestamping</Button>

                { loading &&
                    <span><Spinner/> {progressCount} / {totalCount}</span>
                }

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
])(Bulk);
