import getJSON from "../../../lib/TimestampStandard";
import striptags from "striptags";

export default function getItems(schema) {
    let items;
    if (schema.revisions) {
        const revisions = schema.revisions;
        delete schema.revisions;
        items = [schema, ...revisions];
    } else {
        items = [schema];
    }

    const type = (items[0]['@context']) ? schema['@context']['@type'] : null;

    switch (type) {
        case 'ProductTimestamp':
            items = prepareProducts(items);
            break;
        default:
            items =  prepareArticles(items);
    }

    items.forEach((item, key) => {
        items[key].raw = getJSON(item, type);
        items[key].transactionUrl = getTransactionUrl(item.blockchain, item.transactionId);
    });

    return items;
}

function prepareArticles(items) {
    items.forEach((item, key) => {
        items[key].content = prepareContent(item.content);
    });

    return items;
}

function prepareProducts(items) {
    return items;
}

function getTransactionUrl(network, transactionId) {
    switch (network) {
        case 'telos_main':
        case 'telos':
            return 'https://telos.bloks.io/transaction/' + transactionId;
        case 'eosJungle':
        case 'eos_jungle':
            return 'https://jungle.bloks.io/transaction/' + transactionId;
        default:
            return 'https://bloks.io/transaction/' + transactionId;
    }
}

function prepareContent(content) {
    content = content.replace(/<\/p>/g, 'WORDPROOF_PARAGRAPH_END');
    content = content.replace(/(\r\n|\n|\r)/gm, "");
    content = striptags(content);
    content = content.replace(/WORDPROOF_PARAGRAPH_END/g, '\n\n');
    return content;
}
