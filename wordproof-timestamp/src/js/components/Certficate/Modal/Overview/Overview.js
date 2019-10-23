import React from 'react';
import Nav from "../components/Nav";
import {LockUnsecure} from "../components/Lock";
import BlockIntegrity from "./BlockIntegrity";
import BlockLastEdit from "./BlockLastEdit";

export default class Overview extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Nav title={'This Content is WordProof'}/>

                <div className={'flex flex-row'}>
                    <div className={'w-1/3'}>
                        <LockUnsecure className={'w-full'}/>
                    </div>
                    <div className={'w-2/3 py-4 text-left px-6'}>
                        <BlockIntegrity />
                        <BlockLastEdit articles={this.props.articles} />
                    </div>
                </div>
            </>
        );
    }
}
