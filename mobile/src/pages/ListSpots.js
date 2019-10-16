import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, AsyncStorage, Text, Image, StyleSheet, ScrollView  } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function ListSpots() {
	const [technologies, setTechnologies] = useState([]);
	
	useEffect(() => {
		AsyncStorage.getItem('user').then(user_id => {
			const socket = socketio('http://10.0.75.1:3333', {
				query: { user_id }
			});

			socket.on('booking_response', booking => {
				Alert.alert(`Sua reserva em ${booking.spot.company} em 
				${booking.date} foi ${booing.approved ? 'APROVADA' : 'REJEITADA'}`)
			})
		})
	})

	useEffect(() => {
			AsyncStorage.getItem('technologies').then(storagedTechs => {
					const techsArray = storagedTechs.split(',').map(tech => tech.trim());

					setTechnologies(techsArray);
			})
	}, []);


	return (
		<SafeAreaView style={styles.container}>
			<Image source={logo} style={styles.logo} />	

			<ScrollView>
				{technologies.map(tech => <SpotList key={tech} tech={tech} />)}
			</ScrollView>

		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	logo: {
		height: 32,
		resizeMode: 'contain',
		alignSelf: 'center',
		marginTop: 10
	}
})