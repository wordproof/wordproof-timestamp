const { registerPlugin } = wp.plugins;

import WordProof_Post_Meta from './post_meta_fields';

registerPlugin( 'wordproof-post-settings', {

    /* eslint-disable */
    render() {
        return(<WordProof_Post_Meta />);
    }
    /* eslint-enable */
} );