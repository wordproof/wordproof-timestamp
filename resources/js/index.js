const { render } = wp.element;

import About from './Components/Pages/About';
import Migrate from './Components/Pages/Migrate';

document.addEventListener( 'DOMContentLoaded', function ( event ) {
	const page = document.getElementById( 'wordproof-about' )
	if (page) {
		render( <About />, page);
	}
} );

document.addEventListener( 'DOMContentLoaded', function ( event ) {
	const page = document.getElementById( 'wordproof-migrate' )
	if (page) {
		render( <Migrate />, page);
	}
} );
