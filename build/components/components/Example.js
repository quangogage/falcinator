'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./Example.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Example = function Example() {
  return _react2.default.createElement(
    'div',
    { className: 'Example' },
    _react2.default.createElement(
      'h1',
      { className: 'Example-text' },
      'Create React Libraries'
    )
  );
};

exports.default = Example;