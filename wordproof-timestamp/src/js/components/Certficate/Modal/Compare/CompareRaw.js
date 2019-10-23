import React from 'react';
import Nav from "../components/Nav";

export default class CompareRaw extends React.Component {
    render() {
        return (
            <>
                <Nav title={'Check it yourself'} backView={'compare'}/>

                <div className={'flex flex-row'}>
                    <div className={'w-1/2 m-4'}>
                        <div>Content</div>
                    </div>
                    <div className={'w-1/2 m-4'}>
                        <p>Explanation</p>
                    </div>
                </div>
            </>
        );
    }
}
