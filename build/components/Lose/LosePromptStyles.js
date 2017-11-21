'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var LosePromptStyles = {
  container: {
    display: 'none',
    position: 'absolute'
  },
  window: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    zIndex: 100,
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    background: 'red',
    borderRadius: '10px'
  },
  scoreList: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  score: '\n    display: flex;\n    align-items: center;\n    justify-content: space-around;\n  '
};
exports.default = LosePromptStyles;