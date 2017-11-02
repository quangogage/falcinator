'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SecondExample = require('./SecondExample');

var _SecondExample2 = _interopRequireDefault(_SecondExample);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('SecondExample renders without crashing', function () {
  var div = document.createElement('div');
  _reactDom2.default.render(_react2.default.createElement(_SecondExample2.default, null), div);
});