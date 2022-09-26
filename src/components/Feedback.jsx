import React, { Component } from 'react';
import { Section } from './Feedback.styled';
import { Statistics } from './Statistics';
import { FeedbackOptions } from './FeedbackOptions';
import { Notification } from './Notification';

class Feedback extends Component {
  
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };
  toggle = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  };
  stateKeys = () => Object.keys(this.state);
  increment = key =>
    this.setState(prevState => {
      return { [key]: prevState[key] + 1 };
    });
  incrementGood = () => {
    this.setState(state => {
      return { good: state.good + 1 };
    });
  };
  incrementNeutral = () => {
    this.setState(state => {
      return { neutral: state.neutral + 1 };
    });
  };
  incrementBad = () => {
    this.setState(state => {
      return { bad: state.bad + 1 };
    });
  };
  countTotalFeedback = () =>
    this.state.bad + this.state.neutral + this.state.good;
  countPositiveFeedbackPercentage = () =>
    Math.round(this.state.good / (this.countTotalFeedback() / 100));

  render() {
    return (
      <>
        <Section title="Please leave feedback">
          Please leave feedback
          <FeedbackOptions
            options={{
              incrementGood: this.incrementGood,
              incrementNeutral: this.incrementNeutral,
              incrementBad: this.incrementBad,
            }}
            onLeaveFeedback={{
              countTotalFeedback: this.countTotalFeedback,
              countPositiveFeedbackPercentage:
                this.countPositiveFeedbackPercentage,
            }}
          />
        </Section>
        <Section title="Statistics">
          Statistics
          <Notification message="There is no feedback"></Notification>
          <Statistics
            good={this.state.good}
            neutral={this.state.neutral}
            bad={this.state.bad}
            total={this.countTotalFeedback()}
            positivePercentage={this.countPositiveFeedbackPercentage()}
          />
        </Section>
      </>
    );
  }
}
export default Feedback;
