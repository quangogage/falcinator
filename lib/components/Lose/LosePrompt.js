import React from 'react';
import LosePromptStyles from './LosePromptStyles';
import { hasLost } from './Lose';
import { getHighScores } from './Highscores';

export default class LosePrompt extends React.Component {
  render() {
    var styles = LosePromptStyles;
    var scores = getHighScores();
    return (
      <div className="LosePrompt" style={styles['container']}>
        <div className="score-list">
          {scores.map((score, index) => {
            <div className="score">
              <div className="name">{score.name}</div>
              <div className="time">{score.time}</div>
            </div>;
          })}
        </div>
      </div>
    );
  }
}
