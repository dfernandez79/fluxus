var path = require('path');
var fs = require('fs-extra');
var exec = require('child_process').exec;
var os = require('os');
var EventEmitter = require('events').EventEmitter;

function ExtractPages(config) {
  this._inputFile = path.resolve(config.inputFile);
  this._outputDir = path.resolve(config.outputDir);
  this._tmpDir = config.tmpDir || os.tmpdir();
  this._renderPDFWorkflow = config.renderPDFWorkflow || path.resolve(__dirname, '../resources', 'render-pdf.workflow');
  this._outputPrefix = config.outputPrefix || path.basename(this._inputFile, path.extname(this._inputFile));
  this._emitter = new EventEmitter();
  ['on', 'addListener', 'removeListener', 'removeAllListeners', 'listeners'].forEach(function (m) {
    this[m] = this._emitter[m].bind(this._emitter);
  }.bind(this));
}

ExtractPages.friendlyName = function () {
  return 'Extract Pages';
}

ExtractPages.appliesTo = function (config) {
  return config.action && typeof config.action === 'string' && config.action.toLowerCase() === 'extractpages';
};

ExtractPages.prototype = {
  fileToWatch: function () {
    return this._inputFile;
  },

  _withInputFileDo: function (cb) {
    var inputFile = this._inputFile;
    var self = this;

    if (path.extname(this._inputFile) === '.ai') {
      inputFile = path.join(this._tmpDir, path.basename(this._inputFile, '.ai') + '.pdf');
      fs.copy(this._inputFile, inputFile, function (err) {
        if (!err) {
          cb.call(self, inputFile, function () { fs.unlinkSync(inputFile); });
        } else {
          self._emitter.emit('error', {action: self, cause: err});
        }
      });
    } else {
      cb.call(this, inputFile, function () {});
    }
  },

  _parseFiles: function (str) {
    var replaced = str.replace(/^\{/, '[').replace(/\}\s*$/, ']');
    return JSON.parse(replaced);
  },

  _extractPages: function (inputFile, done) {
    var outputDir = this._outputDir;
    var emitter = this._emitter;
    var self = this;

    emitter.emit('progress', {action: this, status: 'Running automator' });

    exec('automator -D Input="' + inputFile + '" "' + this._renderPDFWorkflow + '"',
      function (err, stdout, stderr) {
        if (!err) {
          try {
            self._parseFiles(stdout).forEach(function (file, index) {
              var dest = path.join(outputDir, self._outputPrefix + '-' + index + '@2x.png');
              fs.renameSync(file, dest);
              emitter.emit('progress', {action: self, status: 'Copy from ' + file + ' to ' + dest });
            });
          } catch (e) {
            emitter.emit('error', {action: self, cause: e});
          }
        } else {
          emitter.emit('error', {action: self, cause: err});
        }

        done();
        emitter.emit('end', {action: self});
      });
  },

  run: function () {
    this._emitter.emit('start', {action: this});
    this._withInputFileDo(function (inputFile, done) {
      this._extractPages(inputFile, done);
    });
  },

  friendlyName: function () {
    return ExtractPages.friendlyName();
  },

  toString: function () {
    return this.friendlyName() + ' ' + this._inputFile + ' -> ' + this._outputDir;
  }
};

module.exports = ExtractPages;
