import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Seat from './Seat'; // Import Seat component

interface TrainRowProps {
  seats: boolean[];
  handleSeatPress: (rowIndex: number, seatIndex: number) => void;
  rowIndex: number; // Access seatSelection state from parent component (App.tsx)
}

const TrainRow: React.FC<TrainRowProps> = ({ seats, handleSeatPress, rowIndex }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 }}>
    {seats.map((isSelected, index) => (
      <Seat
        key={`${rowIndex}-${index}`}
        isSelected={isSelected}
        rowIndex={rowIndex}
        seatIndex={index}
        onPress={() => handleSeatPress(rowIndex, index)}
      />
    ))}
  </View>
);

export default TrainRow;
