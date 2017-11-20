import React from 'react';
import LosePromptStyles from './LosePromptStyles';
import { hasLost } from './Lose';

export default class LosePrompt extends React.Component {
  render() {
    return (
      <div className="LosePrompt" style={LosePromptStyles['container']}>
        YOU HAVE LOST!!
      </div>
    );
  }
}
