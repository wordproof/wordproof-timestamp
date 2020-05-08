import React, {Component} from 'react';

export default class ModeDisplay extends Component {
    render() {
        const automatic = wordproofSettings.isWSFYActive;
        const manual = !wordproofSettings.isWSFYActive && wordproofSettings.walletIsConnected;
        return (
            <div className={'flex flex-row mb-4'}>
                {(automatic) ? <span className={'text-green-700'}>Your content is being timestamped automatically.</span> : ''}
                {(manual) ? <span className={'text-green-700'}>WordProof is setup to be used manually with Scatter</span> : ''}
                {(!automatic && !manual) ? <span className={'text-red-700'}>Please <a href={wordproofData.urls.wizard}>setup WordProof</a>.</span> : ''}
            </div>
        )
    }
}

