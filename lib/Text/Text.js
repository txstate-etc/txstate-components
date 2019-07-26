"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Text = function Text(props) {
  var children = props.children,
      renderAs = props.renderAs,
      style = props.style,
      className = props.className;
  return _react["default"].createElement(renderAs, {
    style: style,
    className: className
  }, children);
};

exports.Text = Text;
Text.defaultProps = {
  renderAs: 'span'
};
Text.propTypes = {
  renderAs: _propTypes["default"].string
};