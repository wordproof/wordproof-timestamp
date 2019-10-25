import React from 'react';
import ButtonListItem from "./ButtonListItem";
import {QuestionMark, Eye, Clock, Blockchain} from "../components/Icons";

export default class ButtonList extends React.Component {
    toRaw() {
        document.dispatchEvent(new Event('wordproof.modal.navigate.compare.raw'));
    }

    render() {
        return (
            <div className={'shadow-lg mx-6 mb-1 border-gray-300 bg-gray-200 border rounded-lg'}>
                <div className={'flex items-center flex-wrap'}>
                    <ButtonListItem href={''} icon={<QuestionMark/>}>{wStrings.compare.buttons.explanation}</ButtonListItem>
                    <ButtonListItem href={''} navigate={'compare.raw'} icon={<Eye/>}>{wStrings.compare.buttons.raw}</ButtonListItem>
                    <ButtonListItem href={''} icon={<Clock color={'#0017B1'}/>}>{wStrings.compare.buttons.checker}</ButtonListItem>
                    <ButtonListItem href={''} icon={<Blockchain/>}>{wStrings.compare.buttons.blockchain}</ButtonListItem>
                </div>
            </div>
        );
    }
}
