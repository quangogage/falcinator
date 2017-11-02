'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./SecondExample.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SecondExample = function SecondExample() {
  return _react2.default.createElement(
    'div',
    { className: 'SecondExample' },
    _react2.default.createElement(
      'p',
      { className: 'SecondExample-text' },
      'Based on Facebook\'s ',
      '\xA0',
      _react2.default.createElement(
        'a',
        {
          className: 'SecondExample-link',
          target: '_blank',
          rel: 'noopener noreferrer',
          href: 'https://github.com/facebookincubator/create-react-app'
        },
        'Create react app'
      )
    ),
    _react2.default.createElement(
      'a',
      {
        className: 'SecondExample-github-link',
        target: '_blank',
        rel: 'noopener noreferrer',
        href: 'https://github.com/Rubbby/create-react-library'
      },
      'Documentation'
    )
  );
};

exports.default = SecondExample;