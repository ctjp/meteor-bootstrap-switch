var fs = Npm.require('fs');
var path = Npm.require('path');
var pluginName = 'compileBootstrapSwitch';

console.log('');

Plugin.registerSourceHandler('bootstrap-switch.json', { archMatching: 'web' }, function (compileStep) {
  var options = compileStep.read().toString('utf8');
  var jsonPath = compileStep._fullInputPath;
  var lessPath = 'bootstrap-switch/src/less/';
  var less = {};
  var themes = {
    bootstrap2: {},
    bootstrap3: {}
  };

  // Parse options
  try {
    options = JSON.parse(options);
  } catch (e) {
    compileStep.error({
      message: pluginName + '->registerSourceHandler: ' + e.message,
      sourcePath: compileStep.inputPath
    });
    return;
  }

  if (options.theme && !themes[options.theme]) {
    options.theme = '';
  }

  options.standalone = !!options.standalone;

  // If empty or incorrect write default configuration
  if (options === '' || !options.theme || typeof options.standalone !== 'boolean') {
    options = [
      '{',
      '  "theme": "' + (options.theme || 'bootstrap3') + '",',
      '  "standalone": ' + options.standalone,
      '}'
    ];
    fs.writeFileSync(jsonPath, options.join('\n'));
  }

  if (options.theme) {
    // Filenames
    var variablesLessFile = jsonPath.replace(/json$/i, options.theme + '-variables.import.less');
    var buildLessFile = jsonPath.replace(/json$/i, 'build.import.less');
    var outputLessFile = jsonPath.replace(/json$/i, 'import.less');

    // bootstrap-switch.less
    createLessFile(outputLessFile, [
      '// THIS FILE IS GENERATED, DO NOT MODIFY IT!',
      '// This contains the "' + options.theme + '" theme for Bootstrap Switch.',
      '// You can import this directly by @import "' + path.basename(outputLessFile) + '"',
      '// or @import "' + path.basename(buildLessFile) + '" if you\'re building independent of Bootstrap',
      getLessContent(lessPath + options.theme + '/bootstrap-switch.less')
    ]);

    if (options.standalone) {
      // variables.less
      if (!fs.existsSync(variablesLessFile)) {
        createLessFile(variablesLessFile, [
          "// CUSTOMIZE THIS FILE!",
          "// It won't be overwritten as long as it exists.",
          "// You may include this file into your less files to benefit from",
          "// mixins and variables that bootstrap provides.",
          getLessContent(lessPath + options.theme + '/variables.less')
        ]);
      }

      // build.less
      createLessFile(buildLessFile, [
        '// THIS FILE IS GENERATED, DO NOT MODIFY IT!',
        '// You may include this file into your less files to benefit from',
        '// mixins and variables that Bootstrap Switch provides.',
        '',
        '@import "' + path.basename(variablesLessFile) + '";',
        '@import "' + path.basename(outputLessFile) + '";',
        getLessContent(lessPath + options.theme + '/mixins.less')
      ]);
    }
    else {
      // Clean-up
      if (fs.existsSync(buildLessFile)) {
        fs.unlinkSync(buildLessFile);
      }
    }
  }
});

var createLessFile = function (path, content) {
  fs.writeFileSync(path, content.join('\n'), { encoding: 'utf8' });
};

var getAsset = function (filename) {
  return BootstrapSwitchAssets(filename);
};

var getLessContent = function (filename) {
  var content = getAsset(filename);
  return '\n\n// @import "' + filename + '"\n' +
    content.replace(/@import\s*["']([^"]+)["'];?/g, function (statement, importFile) {
      return getLessContent(path.join(path.dirname(filename), importFile));
    });
};
