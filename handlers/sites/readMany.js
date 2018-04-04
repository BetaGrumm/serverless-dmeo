'use strict';

module.exports.read = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase()
    .then(() => {
      Site.find()
        .then(notes => callback(null, {
          statusCode: 200,
          body: JSON.stringify(notes)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the notes.'
        }))
    });
};