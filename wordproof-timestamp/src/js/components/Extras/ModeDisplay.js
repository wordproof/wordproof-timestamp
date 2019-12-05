import React, {Component} from 'react';

export default class ModeDisplay extends Component {
    render() {
        const automatic = wordproofSettings.isWSFYActive;
        const manual = !wordproofSettings.isWSFYActive && wordproofSettings.walletIsConnected;
        const styles = {minWidth: '160px'};
        return (
            <div className={'flex flex-row mb-4'}>
                <div className={`rounded-lg shadow mr-4 p-4 ${(automatic) ? 'bg-blue-500' : 'bg-blue-200'}`} style={styles}>
                    <span className={`block pb-16 ${(automatic) ? 'font-semibold text-white' : 'text-blue-500'}`}>Automatic</span>
                    <span className={'block text-right text-white'}>{(automatic) ? 'active' : 'inactive'}</span>
                </div>
                <div className={`rounded-lg shadow p-4 ${(manual) ? 'bg-blue-500' : 'bg-blue-200'}`} style={styles}>
                    <span className={`block pb-16 ${(manual) ? 'font-semibold text-white' : 'text-blue-500'}`}>Manual</span>
                    <span className={'block text-right text-white'}>{(manual) ? 'active' : 'inactive'}</span>
                </div>
            </div>
        )
    }
}

