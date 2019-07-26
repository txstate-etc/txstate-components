"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stack = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var alignmentMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  even: 'space-evenly',
  around: 'space-around'
};

var convertAlignment = function convertAlignment(provided) {
  return alignmentMap[provided] || 'flex-start';
};

var Stack = function Stack(props) {
  var renderAs = props.renderAs,
      spacing = props.spacing,
      horizontal = props.horizontal,
      verticalAlign = props.verticalAlign,
      horizontalAlign = props.horizontalAlign,
      className = props.className;

  var children = _react["default"].Children.map(props.children, function (child) {
    return _react["default"].createElement("div", {
      style: {
        margin: spacing / 2 || 0
      }
    }, child);
  });

  return _react["default"].createElement(renderAs, {
    className: className,
    style: {
      display: 'flex',
      padding: spacing / 2 || 0,
      flexDirection: horizontal ? 'row' : 'column',
      alignItems: horizontal ? convertAlignment(verticalAlign) : convertAlignment(horizontalAlign),
      justifyContent: horizontal ? convertAlignment(horizontalAlign) : convertAlignment(verticalAlign)
    }
  }, children);
};

exports.Stack = Stack;
Stack.propTypes = {
  verticalAlign: _propTypes["default"].oneOf(['start', 'center', 'end', 'even', 'between']),
  horizontalAlign: _propTypes["default"].oneOf(['start', 'center', 'end', 'even', 'between', 'around']),
  horizontal: _propTypes["default"].bool,
  spacing: _propTypes["default"].number,
  renderAs: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element])
};
Stack.defaultProps = {
  verticalAlign: 'start',
  horizontalAlign: 'start',
  horizontal: false,
  renderAs: 'div'
};