import React from 'react';
import {LockSafe, LockSafeOutline, LockUnsafe, LockUnsafeOutline} from "../components/Icons";

export default class Locks extends React.Component {
    render() {
        const bgStyle = {
            transform: 'skewX(166deg)',
            left: '-73px'
        };
        const lock = {
            bottom: '15px',
            left: '40px',
        };
        const lockOutline = {
            top: '15px',
            left: '-15px'
        };
        return (
            <div className={'relative h-full'}>
                <div className={'bg-yellowAccent w-full h-full absolute'} style={bgStyle}/>

                {this.props.secure && <>
                    <LockSafeOutline className={'relative'} style={lockOutline}/>
                    <LockSafe className={'absolute'} style={lock}/>
                </> }

                {!this.props.secure && <>
                    <LockUnsafeOutline className={'relative'} style={lockOutline}/>
                    <LockUnsafe className={'absolute'} style={lock}/>
                </> }

            </div>
        );
    }
}
