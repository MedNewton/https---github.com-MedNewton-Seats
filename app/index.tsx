import Seat from '@/components/Seat';
import TrainLayout from '@/components/TrainLayout';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TouchableHighlight } from 'react-native';
import { Stack } from 'expo-router';

TrainLayout // Import BusLayout component

interface Seat {
  num: number | null,
  row: number | null
}

const App: React.FC = () => {
  const [seatSelection, setSeatSelection] = useState(
    Array(9).fill(Array(5).fill(false)) // Initialize all seats as unselected
  );

  const [cycle, setCycle] = useState<number>(1)
  const [ticket, setTicket] = useState<number>(1)
  const [rowNumber, setRowNumber] = useState<number | null>(0)
  const [seatNumber, setSeatNumber] = useState<number | null>(0)
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
  const [modalVisible, setModalVisible] = useState(false);

  const newCycle = () => {
    Alert.alert(
      'Confirmation',
      'Voulez-vous ajouter un nouveau cycle?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Oui',
          onPress: () => {
            setCycle(cycle + 1)
          },
        },
      ],
      { cancelable: true }
    );

  }

  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const formatTime = (date: Date): string => {
    const hour = date.getHours();
    const minute = date.getMinutes(); // Month is zero-indexed
    

    return `${hour}:${minute}`;
  };

  const handleSeatPress = (rowIndex: number, seatIndex: number) => {
    setRowNumber(rowIndex);
    setSeatNumber(seatIndex);
    const s: Seat = {
      num: seatIndex,
      row: rowIndex
    };
    console.log(s)

    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };



  return (

    <>
      <Stack.Screen options={{ title: 'Oops!', headerShown: false }} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.mainPage}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Cycle: {cycle} </Text>
            <Text style={styles.header}>Date: {formatDate(new Date())} </Text>
          </View>
          <View style={styles.headerButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => { newCycle() }}>
              <Text style={styles.buttonText}>Nouveau Cycle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { console.log("hhh") }}>
              <Text style={styles.buttonText}>Résultats </Text>
            </TouchableOpacity>
          </View>

          <TrainLayout seatSelection={seatSelection} handleSeatPress={handleSeatPress} />
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalView}>
              <View style={styles.modalContent}>
              <Text style={styles.header}>Ticket: {ticket}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 4, width: "100%", marginTop: 5 }}>
                  <Text style={styles.modalText}>Date : {formatDate(new Date())}</Text>
                  <Text style={styles.modalText}>Heure : {formatTime(new Date())}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 4, width: "100%", marginTop: 5 }}>
                  <Text style={styles.modalText}>Rang : {rowNumber}</Text>
                  <Text style={styles.modalText}>Place : {seatNumber}</Text>
                </View>
                <TouchableHighlight
                  style={{ ...styles.closeButton, backgroundColor: "#2196F3" }}
                  onPress={closeModal}
                >
                  <Text style={styles.buttonText}>Fermer</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>

    </>



  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  mainPage: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: 'white',
    paddingTop: 80,
    overflow: 'visible'
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 0
  },
  headerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 0,
    paddingBottom: 30,
    gap: 3
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '50%'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default App;
