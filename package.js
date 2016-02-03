Package.describe({
  name: 'ctjp:meteor-bootstrap-switch',
  summary: 'Meteor package for https://github.com/nostalgiaz/bootstrap-switch',
  version: '3.3.1_5',
  git: 'https://github.com/ctjp/meteor-bootstrap-switch.git'
});

Package.registerBuildPlugin({
  name: 'compileBootstrapSwitch',
  use: [ 'ctjp:meteor-bootstrap-switch-assets@3.3.1_1' ],
  sources: [ 'plugin/import-less.js' ]
});

Package.onUse(function(api) {
  api.versionsFrom(['1.0', '1.2.1']);

  //== Use
  // Client only
  api.use([
    'jquery',
    'less',
    'ctjp:meteor-bootstrap-switch-assets@3.3.1_1'
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
