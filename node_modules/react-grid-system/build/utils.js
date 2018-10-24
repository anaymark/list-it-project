'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global window */
/* eslint "no-console": "off" */

var getViewPort = function getViewPort() {
  if (typeof window !== 'undefined' && window.innerWidth) {
    return window.innerWidth;
  }
  return null;
};

var screenClasses = exports.screenClasses = ['xs', 'sm', 'md', 'lg', 'xl'];

var defaultBreakpoints = exports.defaultBreakpoints = [576, 768, 992, 1200];

var defaultContainerWidths = exports.defaultContainerWidths = [540, 750, 960, 1140];

var defaultGutterWidth = exports.defaultGutterWidth = 30;

var getScreenClass = exports.getScreenClass = function getScreenClass(_ref) {
  var serverSideScreenClass = _ref.serverSideScreenClass,
      breakpoints = _ref.breakpoints;

  var theBreakpoints = breakpoints && breakpoints.length ? breakpoints : defaultBreakpoints;

  var screenClass = serverSideScreenClass || 'xl';

  var viewport = getViewPort();
  if (viewport) {
    screenClass = 'xs';
    if (theBreakpoints[0] && viewport >= theBreakpoints[0]) screenClass = 'sm';
    if (theBreakpoints[1] && viewport >= theBreakpoints[1]) screenClass = 'md';
    if (theBreakpoints[2] && viewport >= theBreakpoints[2]) screenClass = 'lg';
    if (theBreakpoints[3] && viewport >= theBreakpoints[3]) screenClass = 'xl';
  }

  return screenClass;
};

var normalizeColumnWidth = exports.normalizeColumnWidth = function normalizeColumnWidth(width) {
  return Math.max(0, Math.min(12, width));
};