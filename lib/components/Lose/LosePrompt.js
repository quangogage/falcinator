import React from 'react';
import LosePromptStyles from './LosePromptStyles';
export default class LosePrompt extends React.Component {
  render() {
    return (
      <div className="LosePrompt" style={LosePromptStyles['container']}>
        YOU HAVE LOST!!
      </div>
    );
  }
}
