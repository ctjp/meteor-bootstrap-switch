Package.describe({
  name: 'ctjp:meteor-bootstrap-switch',
  summary: 'Meteor wrapper for https://github.com/nostalgiaz/bootstrap-switch',
  version: '3.3.1_1',
  git: 'https://github.com/ctjp/meteor-bootstrap-switch.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  //== Use
  // Client only
  api.use('jquery', 'client');

  //== Add files
  // Client only
  api.addFiles([
    'lib/bootstrap-switch/src/less/bootstrap2/bootstrap-switch.less',
    'lib/bootstrap-switch/src/less/bootstrap3/bootstrap-switch.less',
    'lib/bootstrap-switch/dist/js/bootstrap-switch.js',
  ], 'client');
});

Package.onTest(function(api) {
  //== Use
  // Client only
  api.use([
    'tinytest',
    'ctjp:meteor-bootstrap-switch'
  ], 'client');

  //== Add files
  // Client only
  api.addFiles('tests/meteor-bootstrap-switch.js', 'client');
});
