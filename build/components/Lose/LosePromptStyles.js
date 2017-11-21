'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var LosePromptStyles = {
  container: {
    display: 'none',
    position: 'absolute',
    zIndex: 100,
    width: '100%',
    height: '100%'
  },
  window: {
    position: 'absolute',
    width: '80%',
    height: '80%',
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