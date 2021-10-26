import Layout from '../layouts/Layout';
import ListingCell from '../components/ListingCell';
import QueryResult from '../components/QueryResult';
import React from 'react';
import {Button, Flex, Heading, VStack} from '@chakra-ui/react';
import {HOST_LISTINGS} from '../utils';
import {IoAddCircle} from 'react-icons/io5';
import {Link} from 'react-router-dom';
import {useQuery} from '@apollo/client';

export default function Listings() {
  const {loading, error, data} = useQuery(HOST_LISTINGS);

  return (
    <Layout>
      <Heading as="h1" mb="4">
        My Listings
      </Heading>
      <Flex w="full" justifyContent="flex-end">
        <Button
          as={Link}
          to="/listings/create"
          rightIcon={<IoAddCircle />}
          mb="4"
          colorScheme="blue"
        >
          Add Listing
        </Button>
      </Flex>
      <QueryResult loading={loading} error={error} data={data}>
        {({hostListings}) => {
          return (
            <VStack spacing="4">
              {hostListings.map((listingData, index) => (
                <ListingCell
                  key={`${listingData.title}-${index}`}
                  {...listingData}
                />
              ))}
            </VStack>
          );
        }}
      </QueryResult>
    </Layout>
  );
}
