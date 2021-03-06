// Generated by CoffeeScript 1.9.1
(function() {
  'use strict';
  var $, DAT, Visualizer, World, _, settings;

  require('./helpers');

  $ = require('jquery');

  _ = require('underscore');

  Visualizer = require('./visualizer/visualizer');

  DAT = require('dat-gui');

  World = require('./model/world');

  settings = require('./settings');

  $(function() {
    var canvas, gui, guiVisualizer, guiWorld;
    canvas = $('<canvas />', {
      id: 'canvas'
    });
    $(document.body).append(canvas);
    window.world = new World();
    world.load();
    if (world.intersections.length === 0) {
      world.generateMap();
      world.carsNumber = 1;
    }
    window.visualizer = new Visualizer(world);
    visualizer.start();
    world.reciveData(world.cars, world.intersections);
    gui = new DAT.GUI();
    guiWorld = gui.addFolder('world');
    guiWorld.open();
    guiWorld.add(world, 'save');
    guiWorld.add(world, 'load');
    guiWorld.add(world, 'clear');
    guiWorld.add(world, 'generateMap');
    guiVisualizer = gui.addFolder('visualizer');
    guiVisualizer.open();
    guiVisualizer.add(visualizer, 'running').listen();
    guiVisualizer.add(visualizer, 'debug').listen();
    guiVisualizer.add(visualizer.zoomer, 'scale', 0.1, 2).listen();
    guiVisualizer.add(visualizer, 'timeFactor', 0.1, 10).listen();
    guiWorld.add(world, 'carsNumber').min(0).max(200).step(1).listen();
    guiWorld.add(world, 'instantSpeed').step(0.00001).listen();
    return gui.add(settings, 'lightsFlipInterval', 0, 50, 0.01).listen();
  });

}).call(this);
