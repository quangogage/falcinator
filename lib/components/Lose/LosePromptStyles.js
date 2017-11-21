const LosePromptStyles = {
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
  score: `
    display: flex;
    align-items: center;
    justify-content: space-between;
    width:80%;
    background:RGB(255,100,100);
  `,
  scoreText: `
    font-family:arial;
    font-size:25px;
    color:white;
    padding:5px;
  `
};
export default LosePromptStyles;
