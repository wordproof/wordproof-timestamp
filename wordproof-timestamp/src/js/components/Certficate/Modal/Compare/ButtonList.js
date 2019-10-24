import React from 'react';
import ButtonListItem from "./ButtonListItem";
import {QuestionMark, Eye, Clock, Blockchain} from "../components/Icons";

export default class ButtonList extends React.Component {
    toRaw() {
        document.dispatchEvent(new Event('wordproof.modal.navigate.compare.raw'));
    }

    render() {
        return (
            <div className={'shadow-lg p-4 mx-6 mb-6 border-gray-300 bg-gray-200 border rounded-lg'}>
            <div className={'flex flex-row justify-between'}>
                <ButtonListItem href={''} icon={<QuestionMark/>}>Test</ButtonListItem>
                <ButtonListItem href={''} navigate={'compare.raw'} icon={<Eye/>}>Raw</ButtonListItem>
                <ButtonListItem href={''} icon={<Clock color={'#0017B1'}/>}>Test</ButtonListItem>
                <ButtonListItem href={''} icon={<Blockchain/>}>Test</ButtonListItem>
            </div>
            </div>
        );
    }
}
