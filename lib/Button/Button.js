"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _color = _interopRequireDefault(require("color"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Text = require("../Text");

var _Theme = require("../Theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ButtonBase = _styledComponents["default"].div.withConfig({
  displayName: "Button__ButtonBase",
  componentId: "sc-36dqiz-0"
})(["width:fit-content;padding:1rem 2rem;border-radius:2px;cursor:pointer;transition:all 200ms ease;&:hover{transform:translate(0px,-3px);}"]);

var ButtonPrimaryContainer = (0, _styledComponents["default"])(ButtonBase).withConfig({
  displayName: "Button__ButtonPrimaryContainer",
  componentId: "sc-36dqiz-1"
})(["background-color:", ";"], function (_ref) {
  var backgroundColor = _ref.backgroundColor;
  return backgroundColor;
});
var ButtonOutlineContainer = (0, _styledComponents["default"])(ButtonBase).withConfig({
  displayName: "Button__ButtonOutlineContainer",
  componentId: "sc-36dqiz-2"
})(["border:1px solid ", ";background-color:", ";padding:1rem 2rem;&:hover{box-shadow:inset 0 -2px 0 0 ", ";border:1px solid ", ";}"], function (_ref2) {
  var borderColor = _ref2.borderColor;
  return borderColor;
}, function (_ref3) {
  var backgroundColor = _ref3.backgroundColor;
  return backgroundColor;
}, function (_ref4) {
  var borderColor = _ref4.borderColor;
  return borderColor;
}, function (_ref5) {
  var borderColor = _ref5.borderColor;
  return borderColor;
});
var ButtonTransparentOutlineContainer = (0, _styledComponents["default"])(ButtonOutlineContainer).withConfig({
  displayName: "Button__ButtonTransparentOutlineContainer",
  componentId: "sc-36dqiz-3"
})(["background-color:transparent;"]);
var ButtonVariants = {
  primary: ButtonPrimaryContainer,
  outline: ButtonOutlineContainer,
  transparent: ButtonTransparentOutlineContainer
};
var ButtonLabel = (0, _styledComponents["default"])(_Text.Text).withConfig({
  displayName: "Button__ButtonLabel",
  componentId: "sc-36dqiz-4"
})(["user-select:none;color:", ";", ":hover{color:", ";}"], function (_ref6) {
  var textColor = _ref6.textColor;
  return textColor;
}, ButtonBase, function (_ref7) {
  var hoverTextColor = _ref7.hoverTextColor;
  return hoverTextColor;
});
var buttonStyles = {
  primary: {
    button: {
      backgroundColor: _Theme.Theme.maroon,
      hoverColor: (0, _color["default"])(_Theme.Theme.maroon).lighten(0.2).string()
    },
    label: {
      textColor: _Theme.Theme.white,
      hoverTextColor: _Theme.Theme.white
    }
  },
  outline: {
    button: {
      backgroundColor: _Theme.Theme.white,
      borderColor: _Theme.Theme.maroon
    },
    label: {
      textColor: _Theme.Theme.maroon,
      hoverTextColor: _Theme.Theme.maroon
    }
  },
  transparent: {
    button: {
      backgroundColor: _Theme.Theme.transparent,
      borderColor: _Theme.Theme.maroon
    },
    label: {
      textColor: _Theme.Theme.maroon,
      hoverTextColor: _Theme.Theme.maroon
    }
  }
};

var Button = function Button(props) {
  var label = props.label,
      variant = props.variant,
      onClick = props.onClick,
      ariaLabel = props.ariaLabel;
  var ButtonContainer = ButtonVariants[variant];
  var style = buttonStyles[variant];
  return _react["default"].createElement(ButtonContainer, _extends({
    role: "button",
    "aria-label": ariaLabel,
    onClick: onClick
  }, style.button), _react["default"].createElement(ButtonLabel, _extends({
    variant: variant
  }, style.label), label));
};

exports.Button = Button;
Button.defaultProps = {
  onClick: function onClick() {
    return null;
  },
  variant: 'primary'
};
Button.propTypes = {
  variant: _propTypes["default"].oneOf(['primary', 'outline', 'transparent']),
  label: _propTypes["default"].string.isRequired,
  onClick: _propTypes["default"].func,
  ariaLabel: _propTypes["default"].string.isRequired
};