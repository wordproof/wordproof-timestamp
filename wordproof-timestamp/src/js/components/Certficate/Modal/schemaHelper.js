import getJSON from "../../../lib/TimestampStandard";

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

    items.forEach((item, key) => {
        items[key].raw = getJSON(item, type);
        items[key].transactionUrl = getTransactionUrl(item.blockchain, item.transactionId);
    });

    switch (type) {
        case 'ProductTimestamp':
            items = prepareProducts(items);
            break;
        case 'MediaObjectTimestamp':
            items = prepareMedia(items);
            break;
        default:
            items = prepareArticles(items);
    }

    return items;
}

function prepareArticles(items) {
    items.forEach((item, key) => {
        items[key].content = prepareArticleContent(item.content);
    });

    return items;
}

function prepareProducts(items) {
    items.forEach((item, key) => {
        items[key].content = prepareProductContent(item);
    });

    return items;
}

function prepareMedia(items) {
    items.forEach((item, key) => {
        items[key].content = prepareMediaContent(item);
    });

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

function prepareArticleContent(content) {
    content = content.replace(/<\/p>/g, 'WORDPROOF_PARAGRAPH_END');
    content = content.replace(/(\r\n|\n|\r)/gm, "");
    content = content.replace(/WORDPROOF_PARAGRAPH_END/g, '\n\n');
    return content;
}

function prepareProductContent(item) {
    let content = '<strong>' + item.name + '</strong>';
    content += '<br/><br/>';
    content += item.description;
    content += '<br/>';
    content += '<img width="200" src="' + item.image + '" />';
    return content;
}

function prepareMediaContent(item) {
    let content = '<strong>' + item.title + '</strong>';
    content += '<br/><br/>';
    content += item.encodingFormat;
    content += '<br/>';

    const imageEncodings = ['image/png', 'image/jpg', 'image/jpeg'];
    if (imageEncodings.includes(item.encodingFormat)) {
        content += '<img width="200" src="' + item.contentUrl + '" />';
    } else {
        content += '<a target="_blank" rel="noopener noreferrer" href="' + item.contentUrl + '">See attachment</a>';
    }

    return content;
}
