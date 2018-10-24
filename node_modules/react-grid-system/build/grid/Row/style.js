'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('../../utils');

exports.default = function (_ref) {
  var gutterWidth = _ref.gutterWidth,
      align = _ref.align,
      debug = _ref.debug,
      moreStyle = _ref.moreStyle;

  var theGutterWidth = typeof gutterWidth === 'number' ? gutterWidth : _utils.defaultGutterWidth;

  var alignItems = align;
  if (align === 'start') alignItems = 'flex-start';
  if (align === 'end') alignItems = 'flex-end';

  var styles = _extends({
    marginLeft: '-' + theGutterWidth / 2 + 'px',
    marginRight: '-' + theGutterWidth / 2 + 'px',
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 0,
    flexShrink: 0,
    alignItems: alignItems
  }, moreStyle);

  if (debug) {
    styles.background = 'rgba(128,128,128,.05)';
  }

  return styles;
};