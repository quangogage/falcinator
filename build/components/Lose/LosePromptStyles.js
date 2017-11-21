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
    height: '100%',
    background: 'RGBA(0,0,0,0.8)'
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
    flexDirection: 'column',
    alignItems: 'center'
  },
  score: '\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    width:80%;\n    background:RGB(255,100,100);\n  ',
  scoreText: '\n    font-family:arial;\n    font-size:25px;\n    color:white;\n    padding:5px;\n  '
};
exports.default = LosePromptStyles;