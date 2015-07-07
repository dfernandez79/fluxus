var fs = require('fs');
var path = require('path');
var EventEmitter = require('events').EventEmitter;
var actionClasses = require('./actions');

function fluxus(config, eventHandlers) {
  var emitter = new EventEmitter();
  var run = {};

  var actions = config.map(function (cfg) {
    var action = actionClasses
      .filter(function (Action) { return Action.appliesTo(cfg); })
      .map(function (Action) { return new Action(cfg); })[0];

    Object.keys(eventHandlers).forEach(function (event) { action.on(event, eventHandlers[event]); });

    return action;
  });

  actions.forEach(function (action) { action.start(); });

  return {
    actions: actions,
    stop: function () {
      actions.forEach(function (action) { action.stop(); });
    }
  };
}

module.exports = fluxus;
