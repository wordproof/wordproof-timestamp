import React from 'react';
import Nav from "../components/Nav";
import Locks from "../Overview/Locks";

export default class CompareExplanation extends React.Component {

    click() {
        document.dispatchEvent(new Event('wordproof.modal.navigate.compare'));
    }

    render() {
        return (
            <>
                <Nav title={wStrings.importance.nav} backView={'compare'}/>

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
