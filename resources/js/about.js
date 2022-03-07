const {render} = wp.element;
import PropTypes from "prop-types";

import About from "./Components/Pages/About";

document.addEventListener('DOMContentLoaded', function(event) {
    render(<About/>, document.getElementById('wordproof-about'));
})

