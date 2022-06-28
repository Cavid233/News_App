import {openDatabase} from 'react-native-sqlite-storage';

const lng = openDatabase('lngDB.db');


export const initLng = () => {
  const promise = new Promise((resolve, reject) => {
    lng.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS lngDB (language TEXT NOT NULL)',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const updateLng = value => {
  const promise = new Promise((resolve, reject) => {
    lng.transaction(tx => {
      tx.executeSql(
        'update lngDB set language = (?);',

        [value],

        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const insertLng = value => {
  const promise = new Promise((resolve, reject) => {
    lng.transaction(tx => {
      tx.executeSql(
        'INSERT INTO lngDB (language) VALUES (?); ',

        [value],

        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const fetchLng = () => {
  const promise = new Promise((resolve, reject) => {
    lng.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM lngDB',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
