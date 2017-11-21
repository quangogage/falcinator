const LosePromptStyles = {
  container: {
    display: 'none',
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
  score: `
    display: flex,
    align-items: center,
    justify-content: space-around
  `
};
export default LosePromptStyles;
