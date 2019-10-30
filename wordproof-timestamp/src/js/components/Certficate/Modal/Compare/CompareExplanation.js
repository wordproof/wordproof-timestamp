import React from 'react';
import Nav from "../components/Nav";
import Locks from "../Overview/Locks";

export default class CompareExplanation extends React.Component {
    render() {
        return (
            <>
                <Nav title={ this.props.valid ? wStrings.overview.nav.valid : wStrings.overview.nav.invalid } backView={'compare'} />

                <div className={'flex flex-row'}>
                    <div className={'hidden md:block md:w-1/3 overflow-hidden'}>
                        <Locks secure={this.props.valid}/>
                    </div>
                    <div className={'w-full md:w-2/3 p-2 md:py-4 md:px-6 text-left'}>
                        <div className={'md:py-4 md:px-6 text-left border-2 border-gray-300 rounded-lg'}>
                            <h2 className={'font-medium'}>{ wStrings.importance.title }</h2>

                            {wStrings.importance.paragraphs.map((number, index) =>
                                <p className={'pb-3 text-gray-700'} key={index}>{number}</p>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
