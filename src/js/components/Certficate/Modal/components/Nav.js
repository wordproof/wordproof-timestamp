import React from 'react';
import {Logo} from './Logo';
import {Close, ArrowLeft} from './Icons';

export default class Nav extends React.Component {
    close = () => {
        document.dispatchEvent(new Event('wordproof.modal.close'));
    };

    changeView = () => {
        document.dispatchEvent(new Event('wordproof.modal.navigate.' + this.props.backView));
    };

    render() {
        return (
            <div className={'flex flex-row items-center py-3 px-3 border-b-2 border-solid border-gray-300'}>
                <div className={'w-1/3'}>
                    {(this.props.backView)
                        ? <button className={'btn btn-outline btn-sm inline-flex items-center justify-center'} onClick={this.changeView}>
                            <span className={'mr-2'}><ArrowLeft/></span> {wStrings.previous}</button>
                        : <Logo/>
                    }
                </div>
                <div className={'w-2/3 flex flex-row items-center justify-end'}>
                    <span className={'hidden md:inline text-darkblue font-medium'}>{ this.props.title}</span>
                    <button className={'ml-3'} onClick={this.close} aria-label={'close'}>
                        <Close />
                    </button>
                </div>
            </div>
        );
    }
}
