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
                        ? <button className={'btn btn-outline trans inline-flex items-center justify-center'} onClick={this.changeView}>
                            <span className={'mr-2'}><ArrowLeft/></span> Previous</button>
                        : <Logo/>
                    }
                </div>
                <div className={'w-2/3 flex flex-row items-center justify-end'}>
                    <span>{ this.props.title}</span>
                    <Close className={'modal-close-icon cursor-pointer ml-3'} onClick={this.close}/>
                </div>
            </div>
        );
    }
}
