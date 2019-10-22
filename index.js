import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class DigitalClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment(new Date()).format('LTS'),
      date: moment(new Date()).format('YYYY/MM/DD'),
      type: props.type || 'date'
    };
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        time: moment().format('LTS')
      });
    }, 1000);
  }
  getNepaliDate(date) {
    const data = ADTOBS.ad2bs(date);
    return data.ne.strMonth + ' ' + data.ne.day + ' , ' + data.ne.year;
  }

  getNepaliTime(date) {
    const data = date.split(' ');
    const time = data[0].split(':');
    const trail =
      data[1] == 'AM' ? 'पूर्वान्ह' : time[0] > 4 ? 'अपरान्ह' : 'मध्यान्ह';
    return (
      getNepaliNumber(time[0]) +
      ':' +
      getNepaliNumber(time[1]) +
      ':' +
      getNepaliNumber(time[2]) +
      ' ' +
      trail
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    let { type, textColor, size, nepali } = this.props;
    switch (type) {
      case 'date':
        return (
          <View style={styles.container}>
            <Text
              style={[
                styles.clock,
                { color: textColor, fontSize: size >= 18 ? 16 : size }
              ]}>
              {nepali
                ? this.getNepaliDate(this.state.date)
                : moment(new Date()).format('LL')}
            </Text>
          </View>
        );
        break;
      case 'time':
        return (
          <View style={styles.container}>
            <Text
              style={[
                styles.clock,
                { color: textColor, fontSize: size >= 18 ? 16 : size }
              ]}>
              {nepali ? this.getNepaliTime(this.state.time) : this.state.time}
            </Text>
          </View>
        );
        break;
      case 'withDate':
        return (
          <View style={[styles.container, { justifyContent: 'space-evenly' }]}>
            <Text
              style={[
                styles.clock,
                { color: textColor, fontSize: size > 22 ? 22 : size }
              ]}>
              {nepali ? this.getNepaliTime(this.state.time) : this.state.time}
            </Text>
            <Text
              style={[
                styles.clock,
                { color: textColor, fontSize: size >= 20 ? 18 : size }
              ]}>
              {nepali
                ? this.getNepaliDate(this.state.date)
                : moment(new Date()).format('LL')}
            </Text>
          </View>
        );
    }
    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.clock,
            { color: textColor, fontSize: size >= 18 ? 14 : size }
          ]}>
          {nepali ? this.getNepaliTime(this.state.time) : this.state.time}
        </Text>
      </View>
    );
  }
}
export default DigitalClock;
DigitalClock.propTypes = {
  type: PropTypes.string,
  textColor: PropTypes.string,
  size: PropTypes.number,
  nepali: PropTypes.bool
};
DigitalClock.defaultProps = {
  nepali: true
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  clock: {
    color: '#fff',
    fontSize: 14,
    paddingHorizontal: 3,
    fontWeight: 'bold'
  }
});
