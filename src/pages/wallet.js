import Layout from '../layouts/Layout';
import React from 'react';
import {Button, Heading, Stack, Text} from '@chakra-ui/react';
import {IoWallet} from 'react-icons/io5';
import {gql, useMutation} from '@apollo/client';
import {useUser} from '../utils';

export const ADD_FUNDS = gql`
  mutation AddFunds($amount: Float!) {
    addFundsToWallet(amount: $amount) {
      code
      success
      message
      amount
    }
  }
`;

export default function Wallet() {
  const {user, setUser} = useUser();
  const [addFundsToWallet] = useMutation(ADD_FUNDS, {
    onCompleted: data => {
      setUser({...user, funds: data.addFundsToWallet.amount});
    }
  });

  return (
    <Layout>
      <Stack direction="row" spacing="4" align="center">
        <Heading as="h1">My Wallet</Heading>
        <IoWallet size="40" />
      </Stack>
      {user && <Text>Current balance: ${user.funds}</Text>}
      <Button
        onClick={() =>
          addFundsToWallet({
            variables: {
              amount: 100
            }
          })
        }
      >
        Add Funds!
      </Button>
    </Layout>
  );
}
