import cvPublicDataFile from './cv_data.json';
import cvPrivateDataFile from './cv_private.json';

const readDeep = (path, file) => {
  let value = file;
  if (!value) {
    return '';
  }

  path.forEach((element) => {
    if (!value) {
      return;
    }

    value = value[element];
  });

  return value || '';
};

const checkFields = (keys, parent, parentHistory) => {
  keys.forEach((key) => {
    if (typeof parent[key] === 'string' && parent[key] === '%PRIVATE%') {
      parent[key] = readDeep([...parentHistory, key], cvPrivateDataFile);
    } else if (typeof parent[key] === 'object') {
      checkFields(Object.keys(parent[key]), parent[key], [
        ...parentHistory,
        key
      ]);
    }
  });
};

export default () => {
  const keys = Object.keys(cvPublicDataFile);
  const data = cvPublicDataFile;

  checkFields(keys, data, []);
  return data;
};
