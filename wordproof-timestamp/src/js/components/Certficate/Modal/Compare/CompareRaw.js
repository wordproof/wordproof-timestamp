import React from 'react';
import Nav from "../components/Nav";

export default class CompareRaw extends React.Component {
    render() {
        console.log(this.props.raw);
        return (
            <>
                <Nav title={ wStrings.compare.raw.nav} backView={'compare'}/>

                <div className={'flex flex-row'}>
                    <div className={'w-1/2 m-4'}>
                        <div className={'text-sm bg-gray-300 px-6 py-4 rounded overflow-x-scroll'}>{JSON.stringify(this.props.raw)}</div>
                    </div>
                    <div className={'w-1/2 m-4'}>
                        <h2>{ wStrings.compare.raw.title }</h2>
                        <p>{ wStrings.compare.raw.text }</p>
                    </div>
                </div>
            </>
        );
    }
}
