import getJSON from "../../../lib/TimestampStandard";
import striptags from "striptags";

export default function getArticles(schema) {
    let articles;
    if (schema.revisions) {
        const revisions = schema.revisions;
        delete schema.revisions;
        articles = [schema, ...revisions];
    } else {
        articles = [schema];
    }

    articles.forEach((article, key) => {
        articles[key].raw = getJSON(article);
        articles[key].content = prepareContent(article.content);
        articles[key].transactionUrl = getTransactionUrl(article.blockchain, article.transactionId);
    });

    return articles;
}

function getTransactionUrl(network, transactionId) {
    switch (network) {
        case 'telos_main':
            return 'https://telos.bloks.io/transaction/' + transactionId;
        case 'telos':
            return 'https://telos.bloks.io/transaction/' + transactionId;
        case 'eos':
            return 'https://bloks.io/transaction/' + transactionId;
        case 'eos_main':
            return 'https://bloks.io/transaction/' + transactionId;
        case 'eosJungle':
            return 'https://jungle.bloks.io/transaction/' + transactionId;
        case 'eos_jungle':
            return 'https://jungle.bloks.io/transaction/' + transactionId;
        default:
            return transactionId;
    }
}

function prepareContent(content) {
    content = content.replace(/<\/p>/g, 'WORDPROOF_PARAGRAPH_END');
    content = content.replace(/(\r\n|\n|\r)/gm, "");
    content = striptags(content);
    content = content.replace(/WORDPROOF_PARAGRAPH_END/g, '\n\n');
    return content;
}
