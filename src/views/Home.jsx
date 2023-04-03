import { StyleSheet, Text, View, Button } from 'react-native';
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import { ME_QUERY } from '../lib/gql/index';

export function Home() {
	const { loading, error, data } = useQuery(ME_QUERY);
	const navigation = useNavigation();

	console.log(data, loading);

	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Home</Text>
			<View style={styles.content}>
				<Text>Bonjour {data && data.me.username} !</Text>
				<Button
					title="S'identifier"
					onPress={() => {
						navigation.navigate('Login');
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	h1: {
		fontSize: 40,
		fontWeight: 500,
		paddingVertical: 20,
		backgroundColor: '#14171c',
		width: '100%',
		textAlign: 'center',
		color: 'white',
	},
	content: {
		flex: 0,
	},
});
