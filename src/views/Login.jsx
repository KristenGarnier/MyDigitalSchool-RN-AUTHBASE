import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

import { LOGIN_MUTATION } from '../lib/gql/index';
import { TOKEN_KEY } from '../lib/constants/index';
import { useUserStore } from '../lib/store/user';

export function Login() {
	const [login] = useMutation(LOGIN_MUTATION);
	const navigation = useNavigation();
	const { setConnected } = useUserStore();

	const [form, setForm] = useState({
		identifier: '',
		password: '',
	});

	function onChangeText(name, value) {
		setForm({
			...form,
			[name]: value,
		});
	}

	async function handleSubmit() {
		const res = await login({
			variables: {
				input: {
					identifier: form.identifier,
					password: form.password,
				},
			},
		});

		await SecureStore.setItemAsync(TOKEN_KEY, res.data.login.jwt);
		setConnected(true);
	}

	return (
		<View>
			<Text>Todo List</Text>
			<View>
				<TextInput
					style={styles.input}
					onChangeText={(value) => onChangeText('identifier', value)}
					value={form.identifier}
				/>
				<TextInput
					style={styles.input}
					onChangeText={(value) => onChangeText('password', value)}
					value={form.password}
				/>

				<Button title="S'identifier" color="#f194ff" onPress={handleSubmit} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});
