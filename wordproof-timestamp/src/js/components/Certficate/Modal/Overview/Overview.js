import React from 'react';
import Nav from "../components/Nav";
import BlockIntegrity from "./BlockIntegrity";
import BlockLastEdit from "./BlockLastEdit";
import Locks from "./Locks";

export default class Overview extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Nav title={this.props.valid ? wStrings.overview.nav.valid : wStrings.overview.nav.invalid}/>

                <div className={'flex flex-row'}>
                    <div className={'hidden md:block md:w-1/3 overflow-hidden'}>
                        <Locks secure={this.props.valid}/>
                    </div>
                    <div className={'w-full md:w-2/3 p-2 md:py-4 md:px-6 text-left'}>
                        <BlockIntegrity valid={this.props.valid} />
                        <BlockLastEdit articles={this.props.articles} />
                    </div>
                </div>
            </>
        );
    }
}
