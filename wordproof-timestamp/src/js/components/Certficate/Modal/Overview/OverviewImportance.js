import React from 'react';
import Nav from "../components/Nav";
import Locks from "./Locks";

export default class OverviewImportance extends React.Component {

    click() {
        //TODO
    }

    render() {
        return (
            <>
                <Nav title={'This Content is WordProof'} backView={'overview'}/>

                <div className={'flex flex-row'}>
                    <div className={'w-1/3 overflow-hidden'}>
                        <Locks secure={this.props.valid}/>
                    </div>
                    <div className={'w-2/3 py-4 text-left px-6'}>
                        <h2>{ wStrings.importance.title }</h2>
                        <p>{ wStrings.importance.text }</p>
                        <button className={'btn btn-primary mt-4'} onClick={this.click}>{ wStrings.importance.cta }</button>
                    </div>
                </div>
            </>
        );
    }
}
