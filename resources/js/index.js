const { render } = wp.element;

import About from './Components/Pages/About';
import Bulk from './Components/Pages/Bulk';

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
