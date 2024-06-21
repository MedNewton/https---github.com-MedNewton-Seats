import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface SeatProps {
  isSelected: boolean;
  rowIndex: number;
  seatIndex: number;
  onPress: () => void; // Access seatSelection state from parent component (App.tsx)
}

const Seat: React.FC<SeatProps> = ({ isSelected, rowIndex, seatIndex, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <MaterialCommunityIcons
      name={'car-seat'}
      size={40}
      color={isSelected ? 'red' : 'green'}
    />
  </TouchableOpacity>
);

export default Seat;
