// Generated by CoffeeScript 1.9.1
(function() {
  'use strict';
  var $, METHODS, Point, Rect, Tool, _;

  require('../helpers.coffee');

  $ = require('jquery');

  _ = require('underscore');

  Point = require('../geom/point.coffee');

  Rect = require('../geom/rect.coffee');

  require('jquery-mousewheel')($);

  METHODS = ['click', 'mousedown', 'mouseup', 'mousemove', 'mouseout', 'mousewheel', 'contextmenu'];

  Tool = (function() {
    function Tool(visualizer, autobind) {
      this.visualizer = visualizer;
      this.ctx = this.visualizer.ctx;
      this.canvas = this.ctx.canvas;
      this.isBound = false;
      if (autobind) {
        this.bind();
      }
    }

    Tool.prototype.bind = function() {
      var i, len, method, results;
      this.isBound = true;
      results = [];
      for (i = 0, len = METHODS.length; i < len; i++) {
        method = METHODS[i];
        if (this[method] != null) {
          results.push($(this.canvas).on(method, this[method]));
        }
      }
      return results;
    };

    Tool.prototype.unbind = function() {
      var i, len, method, results;
      this.isBound = false;
      results = [];
      for (i = 0, len = METHODS.length; i < len; i++) {
        method = METHODS[i];
        if (this[method] != null) {
          results.push($(this.canvas).off(method, this[method]));
        }
      }
      return results;
    };

    Tool.prototype.toggleState = function() {
      if (this.isBound) {
        return this.unbind();
      } else {
        return this.bind();
      }
    };

    Tool.prototype.draw = function() {};

    Tool.prototype.getPoint = function(e) {
      return new Point(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop);
    };

    Tool.prototype.getCell = function(e) {
      return this.visualizer.zoomer.toCellCoords(this.getPoint(e));
    };

    Tool.prototype.getHoveredIntersection = function(cell) {
      var id, intersection, intersections;
      intersections = this.visualizer.world.intersections.all();
      for (id in intersections) {
        intersection = intersections[id];
        if (intersection.rect.containsRect(cell)) {
          return intersection;
        }
      }
    };

    return Tool;

  })();

  module.exports = Tool;

}).call(this);