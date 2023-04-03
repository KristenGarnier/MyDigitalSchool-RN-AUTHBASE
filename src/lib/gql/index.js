import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
	mutation ($input: UsersPermissionsLoginInput!) {
		login(input: $input) {
			jwt
			user {
				username
				email
			}
		}
	}
`;

export const ME_QUERY = gql`
	query {
		me {
			username
			email
		}
	}
`;
