import React from 'react';
import Nav from "../components/Nav";
import BlockIntegrity from "./BlockIntegrity";
import BlockLastEdit from "./BlockLastEdit";
import Locks from "./Locks";
// import MobileCornerBackground fr,om "./MobileCornerBackground";

export default class Overview extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Nav title={wStrings.overview.nav.valid}/>

                <div className={'flex flex-row'}>
                    <div className={'hidden md:block md:w-1/3 overflow-hidden'}>
                        <Locks secure={this.props.valid}/>
                    </div>
                    <div className={'w-full md:w-2/3 py-4 text-left px-6'}>
                        <BlockIntegrity valid={this.props.valid} />
                        <BlockLastEdit articles={this.props.articles} />
                    </div>
                </div>

                {/*<MobileCornerBackground/>*/}
            </>
        );
    }
}