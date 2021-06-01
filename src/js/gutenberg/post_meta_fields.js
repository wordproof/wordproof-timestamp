const { __ } = wp.i18n;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

const { PluginDocumentSettingPanel } = wp.editPost;
const { ToggleControl, PanelRow } = wp.components;

const WordProof_Post_Meta = ( { postType, postMeta, setPostMeta } ) => {
    if ( 'post' !== postType ) return null;  // Will only render component for post type 'post'

    /* eslint-disable */
    return(
        <PluginDocumentSettingPanel title={ __( 'WordProof Post Settings', 'txtdomain') } icon="edit" initialOpen="false">
            <PanelRow>
                <ToggleControl
                    label={ __( 'Hide the certificate link for this post', 'txtdomain' ) }
                    onChange={ ( value ) => setPostMeta( { _wordproof_hide_certificate: value } ) }
                    checked={ postMeta._wordproof_hide_certificate }
                />
            </PanelRow>
        </PluginDocumentSettingPanel>
    );
    /* eslint-enable */

}

export default compose( [
    withSelect( ( select ) => {
        return {
            postMeta: select( 'core/editor' ).getEditedPostAttribute( 'meta' ),
            postType: select( 'core/editor' ).getCurrentPostType(),
        };
    } ),
    withDispatch( ( dispatch ) => {
        return {
            setPostMeta( newMeta ) {
                dispatch( 'core/editor' ).editPost( { meta: newMeta } );
            }
        };
    } )
] )( WordProof_Post_Meta );