'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _utils = require('../../utils');

var _RenderAny = require('../../support/RenderAny');

var _RenderAny2 = _interopRequireDefault(_RenderAny);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window */

var ScreenClassRender = function (_React$Component) {
  _inherits(ScreenClassRender, _React$Component);

  function ScreenClassRender() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ScreenClassRender);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ScreenClassRender.__proto__ || Object.getPrototypeOf(ScreenClassRender)).call.apply(_ref, [this].concat(args))), _this), _this.componentWillMount = function () {
      _this.setScreenClass();
    }, _this.componentDidMount = function () {
      _this.eventListener = (0, _throttle2.default)(_this.setScreenClass, 100);
      window.addEventListener('resize', _this.eventListener);
    }, _this.componentWillUnmount = function () {
      _this.eventListener.cancel();
      window.removeEventListener('resize', _this.eventListener);
    }, _this.setScreenClass = function () {
      _this.setState({ screenClass: (0, _utils.getScreenClass)(_this.context) });
    }, _this.getStyle = function () {
      return _this.props.style(_this.state.screenClass, _this.props.children.props);
    }, _this.render = function () {
      if (_this.props.render) {
        return _react2.default.createElement(
          _RenderAny2.default,
          null,
          _this.props.render(_this.state.screenClass)
        );
      }
      if (_this.props.style) {
        return _react2.default.cloneElement(_this.props.children, { style: _this.getStyle() });
      }
      return false;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return ScreenClassRender;
}(_react2.default.Component);

ScreenClassRender.propTypes = {
  /**
   * Content of the component
   */
  children: _propTypes2.default.element,
  /**
   * A function returning the style for the children.
   * Will be called with two arguments: the screen class and
   * the props of the child element.
   */
  style: _propTypes2.default.func,
  /**
   * A function which return value will be rendered.
   * Will be called with one argument: the screen class.
   * When set, the props children and style will be ignored.
   */
  render: _propTypes2.default.func
};
ScreenClassRender.defaultProps = {
  children: null,
  style: null,
  render: null
};
ScreenClassRender.contextTypes = {
  serverSideScreenClass: _propTypes2.default.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  breakpoints: _propTypes2.default.arrayOf(_propTypes2.default.number)
};
exports.default = ScreenClassRender;