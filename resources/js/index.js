const { render } = wp.element;
import { ray } from 'node-ray';

import About from './Components/Pages/About';
import Bulk from './Components/Pages/Bulk';

Ray.useDefaultSettings();

document.addEventListener( 'DOMContentLoaded', function ( event ) {
	const page = document.getElementById( 'wordproof-about' );
	if ( page ) {
		render( <About />, page );
	}
} );

document.addEventListener( 'DOMContentLoaded', function ( event ) {
	const page = document.getElementById( 'wordproof-bulk' );
	if ( page ) {
		render( <Bulk />, page );
	}
} );
