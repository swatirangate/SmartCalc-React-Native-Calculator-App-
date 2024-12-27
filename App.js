import { View, Text, Switch, TouchableOpacity, Dimensions, PixelRatio, Alert } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing FontAwesome icons

// Get the screen dimensions
const { width, height } = Dimensions.get('window');

// Calculate responsive button sizes and margins
const BUTTON_SIZE = width * 0.18; // 18% of screen width for button size
const BUTTON_MARGIN = width * 0.03; // 3% of screen width for margin
const FONT_SIZE = PixelRatio.get() <= 2 ? 30 : 37; // Scale font size based on device's pixel density

export default function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const colors = {
    dark: '#22252D',
    dark1: '#292B36',
    dark2: '#272B33',
    light: '#FFF',
    light1: 'rgb(220, 220, 220)',
    light2: '#F7F7F7',
  };

  const calculate = (title) => {
    if (title == 'C') {
      setResult('');
    } else if (title == 'DL') {
      setResult(result.substring(0, result.length - 1));
    } else if (title == '=') {
      try {
        const ans = Number(eval(result).toFixed(3)).toString();
        setHistory([...history, result + ' = ' + ans]); // Add to history
        setResult(ans);
      } catch (error) {
        Alert.alert('Error', 'Invalid expression');
        setResult('');
      }
    } else {
      setResult(result + title);
    }
  };

  const Btn = ({ title, type }) => (
    <TouchableOpacity
      onPress={() => calculate(title)}
      style={{
        backgroundColor: getColor(colors.light1, colors.dark2),
        height: BUTTON_SIZE,
        width: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 4, // Rounded buttons
        margin: BUTTON_MARGIN,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
      }}
    >
      <Text
        style={{
          fontSize: FONT_SIZE,
          color: getBtnColor(type),
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  const getBtnColor = (type) => {
    if (darkTheme) {
      if (type === 'operator' || type === 'equals' || type === 'clear' || type === 'delete') {
        return '#35FBD6'; // Aqua for operator and equals
      }
    } else {
      if (type === 'operator' || type === 'equals' || type === 'clear' || type === 'delete') {
        return '#EB6363'; // Red for operator and equals
      }
    }

    return getColor(colors.dark, colors.light); // Default color for number buttons
  };

  const getColor = (light, dark) => (darkTheme ? dark : light);

  const clearHistory = () => {
    setHistory([]);
  };

  const showHistory = () => {
    Alert.alert('Calculation History', history.join('\n'));
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        paddingVertical: 20,
        backgroundColor: getColor(colors.light, colors.dark),
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Theme Toggle */}
      <View style={{ marginTop: 20 }}>
      <Switch
        value={darkTheme}
        onValueChange={() => setDarkTheme(!darkTheme)}
        trackColor={{ true: colors.light2, false: colors.dark2 }}
        thumbColor={getColor(colors.dark, colors.light)}
      />
      </View>

      {/* Display Result */}
      <Text
        style={{
          fontSize: FONT_SIZE * 1.5, // Larger font for result display
          width: '100%',
          textAlign: 'right',
          paddingRight: 20,
          color: getColor(colors.dark, colors.light),
          marginTop: 40,
          paddingBottom: 20,
        }}
      >
        {result}
      </Text>

      {/* Buttons */}
      <View
        style={{
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'center',
          backgroundColor: getColor(colors.light1, colors.dark1),
          elevation: 7,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: 20,
          width:'100%',
        }}
      >
        {/* Row 1: C, DL, %, / */}
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Btn title="C" type="clear" />
          <Btn title="DL" type="delete" />
          <Btn title="%" type="operator" />
          <Btn title="/" type="operator" />
        </View>

        {/* Row 2: 7, 8, 9, * */}
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Btn title="7" type="number" />
          <Btn title="8" type="number" />
          <Btn title="9" type="number" />
          <Btn title="*" type="operator" />
        </View>

        {/* Row 3: 4, 5, 6, - */}
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Btn title="4" type="number" />
          <Btn title="5" type="number" />
          <Btn title="6" type="number" />
          <Btn title="-" type="operator" />
        </View>

        {/* Row 4: 1, 2, 3, + */}
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Btn title="1" type="number" />
          <Btn title="2" type="number" />
          <Btn title="3" type="number" />
          <Btn title="+" type="operator" />
        </View>

        {/* Row 5: History, 0, ., = */}
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {/* History Button */}
          <TouchableOpacity onPress={showHistory} style={{ marginHorizontal: 10 }}>
            <View
              style={{
                backgroundColor: getColor(colors.light1, colors.dark2),
                height: BUTTON_SIZE,
                width: BUTTON_SIZE,
                borderRadius: BUTTON_SIZE / 4,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 4,
                marginTop: BUTTON_SIZE * 0.2,
              }}
            >
              <Icon name="history" size={FONT_SIZE} color={getColor(colors.dark, colors.light)} />
            </View>
          </TouchableOpacity>

          <Btn title="0" type="number" />
          <Btn title="." type="number" />
          <Btn title="=" type="equals" />
        </View>
      </View>
    </View>
  );
}
