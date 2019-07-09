export default function getJSON(schema) {
  const type = (schema['@context']['@type']) ? schema['@context']['@type'] : '';

  let object = {};
  switch(type) {
    case 'WebArticleTimestamp':
      object.type = schema['@context']['@type'];
      object.version = schema['@context']['@version'];
      object.title = schema.title;
      object.content = schema.content;
      object.date = schema.date;
      object = checkAttribute(object, schema, 'author');
      object = checkAttribute(object, schema, 'previousVersion');
      object = checkAttribute(object, schema, 'url');
      break;
    default:
      object.title = schema.title;
      object.content = schema.content;
      object.date = schema.date;
      break;
  }
  return object;
}

function checkAttribute(object, schema, attribute) {
  if (schema[attribute]) {
    object[attribute] = schema[attribute];
  }
  return object
}