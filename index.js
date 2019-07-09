'use strict';

let fs = require('fs');
let express = require('express');
let morgan = require('morgan');
let serverPort = 8080;

let app = express();
app.use(morgan('combined'));
app.use((req, res, next) => {
  res.set('X-UA-Compatible', 'IE=edge');
  return next();
});

app._started = startApp();
module.exports = app;

return app;

function startApp() {
  return Promise.resolve()
    .then(() => createSpecEdit())
    .then(() => createEditorServer())
    .then(
      () =>
        new Promise((success, failure) => {
          try {
            let server = app.listen(serverPort, function(err) {
              console.log('');
              console.log('**********************************************************************');
              console.log('');
              console.log(
                '      Open up your browser at http://localhost:%d/editor/?url=/specs/myapi.yaml',
                serverPort
              );
              console.log('');
              console.log('**********************************************************************');
              console.log('');

              return err ? failure(err) : success(server);
            });
          } catch (err) {
            failure(err);
          }
        })
    )
    .catch(err => {
      console.log('Error starting up apispecifications', err);
    });
}

function createSpecEdit() {
  var route = app.route(`/specs/*`);

  route.get(function(req, res) {
    let path = decodeURI(req.path).substring(1);
    res.send(fs.readFileSync(path));
  });

  route.put(function(req, res) {
    let path = decodeURI(req.path).substring(1);
    let rawBody = '';
    req.on('data', function(chunk) {
      rawBody += chunk;
    });
    req.on('end', function() {
      fs.writeFileSync(path, rawBody);
      res.send(fs.readFileSync(path));
    });
  });
}

function createEditorServer() {
  // this serves the swagger editor, including JavaScript, CSS, images and HTML (HTML is not used)
  app.use('/editor/assets', express.static(__dirname + '/node_modules/swagger-editor-dist'));
  // this serves our override of the editor page to provide support for saving changes to backend
  app.use('/editor', express.static(__dirname + '/editor'));
}
