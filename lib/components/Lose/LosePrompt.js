import React from 'react';
import LosePromptStyles from './LosePromptStyles';
import { hasLost } from './Lose';

export default class LosePrompt extends React.Component {
  render() {
    var styles = LosePromptStyles;
    return <div className="LosePrompt" style={styles['container']} />;
  }
}