import React from 'react';
import ButtonListItem from "./ButtonListItem";

export default class ButtonList extends React.Component {
    toRaw() {
        document.dispatchEvent(new Event('wordproof.modal.navigate.compare.raw'));
    }

    render() {
        return (
            <div className={'shadow-lg p-4 m-4 border-gray-300 bg-gray-200 border rounded-lg'}>
            <div className={'flex flex-row justify-between'}>
                <ButtonListItem href={''}>IC Test</ButtonListItem>
                <ButtonListItem href={''} navigate={'compare.raw'}>IC Raw</ButtonListItem>
                <ButtonListItem href={''}>IC Test</ButtonListItem>
                <ButtonListItem href={''}>IC Test</ButtonListItem>
            </div>
            </div>
        );
    }
}
