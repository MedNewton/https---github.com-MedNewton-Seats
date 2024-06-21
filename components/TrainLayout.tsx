import React from 'react';
import TrainRow from './TrainRow';// Import BusRow component
import { View } from 'react-native';

interface BusLayoutProps {
  seatSelection: boolean[][];
  handleSeatPress: (rowIndex: number, seatIndex: number) => void;
}

const TrainLayout: React.FC<BusLayoutProps> = ({ seatSelection, handleSeatPress }) => (
  <View>
    {seatSelection.map((row, rowIndex) => (
      <TrainRow key={rowIndex} seats={row} handleSeatPress={handleSeatPress} rowIndex={rowIndex}/>
    ))}
  </View>
);

export default TrainLayout;
