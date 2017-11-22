import React from 'react';
import LosePromptStyles from './LosePromptStyles';
import { hasLost } from './Lose';
import { getHighScores } from './Highscores';

export default class LosePrompt extends React.Component {
  render() {
    var styles = LosePromptStyles;
    return (
      <div className="LosePrompt" style={styles['container']}>
        <div className="window" style={styles['window']}>
          <h1 style={{ fontFamily: 'arial', color: 'white' }} id="your-score">
            Your score:{' '}
          </h1>
          <h1 style={{ fontFamily: 'arial', color: 'white' }}>High Scores</h1>
          <div className="score-list" style={styles['scoreList']} />
        </div>
      </div>
    );
  }
}
