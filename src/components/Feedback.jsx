import React, { Component } from 'react';
import { Section } from './Feedback.styled';
import { StatisticsComponent } from './StatisticsComponent';
import { FeedbackOptions } from './FeedbackOptions';
import { Notification } from './Notification';
import PropTypes from 'prop-types';

class Feedback extends Component {
  static defaultProps = {
    total: 0,
    positive: 0,
    display: true,
    good: 0,
    neutral: 0,
    bad: 0,
  };
  constructor(props) {
    super(props);

    this.state = {
      good: this.props.good,
      neutral: this.props.neutral,
      bad: this.props.bad,
    };
  }
  
  static propTypes = {
    good: PropTypes.number.isRequired,
    neutral: PropTypes.number.isRequired,
    bad: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    positive: PropTypes.number.isRequired,
    display: PropTypes.bool.isRequired,
    // bad: PropTypes.oneOf(['News', 'Photos']),
    // bad: PropTypes.arrayOf(PropTypes.number),
  };
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
  countTotalFeedback = () => {
    this.setState({ display: true });
    this.setState(state => {
      return { total: state.bad + state.neutral + state.good };
    });
  };
  countPositiveFeedbackPercentage = () => {
    this.setState(state => {
      return { positive: Math.round(state.good / (state.total / 100)) };
    });
  };
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
          <Notification
            message="There is no feedback"
            display={this.state.display}
          ></Notification>
          <StatisticsComponent
            good={this.state.good}
            neutral={this.state.neutral}
            bad={this.state.bad}
            total={this.state.total}
            positivePercentage={this.state.positive}
            display={this.state.display}
          />
        </Section>
      </>
    );
  }
}
export default Feedback;
// Feedback.propTypes = {
//   good: PropTypes.number.isRequired,
//   neutral: PropTypes.number.isRequired,
//   bad: PropTypes.number.isRequired,
//   total: PropTypes.number.isRequired,
//   positive: PropTypes.number.isRequired,
//   display: PropTypes.bool.isRequired,
//   // bad: PropTypes.oneOf(['News', 'Photos']),
//   // bad: PropTypes.arrayOf(PropTypes.number),
// };
