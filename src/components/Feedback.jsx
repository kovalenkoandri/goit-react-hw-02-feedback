import React, { Component } from 'react';
import { Section } from './Section';
import { Statistics } from './Statistics';
import { FeedbackOptions } from './FeedbackOptions';
import { Notification } from './Notification';
import { TitleStatistics } from './TitleStatistics';

class Feedback extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  stateKeys = Object.keys(this.state);

  increment = key =>
    this.setState(prevState => {
      return { [key]: prevState[key] + 1 };
    });

  countTotalFeedback = () =>
    this.state.bad + this.state.neutral + this.state.good;

  countPositiveFeedbackPercentage = () =>
    Math.round(this.state.good / (this.countTotalFeedback() / 100));

  render() {
    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={this.stateKeys}
            onLeaveFeedback={this.increment}
          />
        <TitleStatistics>Statistics</TitleStatistics>
          {this.countTotalFeedback() === 0 ? (
            <Notification message="There is no feedback"></Notification>
          ) : (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          )}
        </Section>
      </>
    );
  }
}
export default Feedback;
