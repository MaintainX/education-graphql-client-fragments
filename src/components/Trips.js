import PropTypes from 'prop-types';
import React from 'react';
import {Box, Flex, Heading, Link, Tag, VStack} from '@chakra-ui/react';
import {
  Content,
  Image,
  InnerContainer,
  ListingReviews,
  OuterContainer
} from './Card';
import {PAST_GUEST_TRIPS} from '../pages/past-trips';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import {gql} from '@apollo/client';
import {useToggle} from 'react-use';

export const SUBMIT_REVIEW = gql`
  mutation SubmitReview(
    $bookingId: ID!
    $hostReview: ReviewInput!
    $locationReview: ReviewInput!
  ) {
    submitHostAndLocationReviews(
      bookingId: $bookingId
      hostReview: $hostReview
      locationReview: $locationReview
    ) {
      success
      message
      hostReview {
        id
        text
        rating
      }
      locationReview {
        id
        text
        rating
      }
    }
  }
`;
function Trip({trip, isPast}) {
  const [isOpen, toggleOpen] = useToggle(false);
  const hasReviews = trip.locationReview && trip.hostReview;

  return (
    <OuterContainer>
      <InnerContainer isPast={isPast} toggleOpen={toggleOpen}>
        <Image
          src={trip.listing.photoThumbnail}
          alt={trip.listing.title}
          w="100px"
          minW="100px"
        />
        <Flex boxSize="full" p="3">
          <Content
            title={trip.listing.title}
            checkInDate={trip.checkInDate}
            checkOutDate={trip.checkOutDate}
            hasReviews={hasReviews}
            isPast={isPast}
            isOpen={isOpen}
            wrapperProps={{w: 'full'}}
          >
            {trip.status === 'CURRENT' ? (
              <Tag
                h="18px"
                w="300px"
                rounded="xl"
                bgColor="#425C0A"
                color="white"
                justifyContent="center"
              >
                You&apos;re staying here right now!
              </Tag>
            ) : null}
          </Content>
        </Flex>
      </InnerContainer>
      {isPast ? (
        <ListingReviews
          isOpen={isOpen}
          title={trip.listing.title}
          isPast={isPast}
          trip={trip}
          mutationConfig={{
            mutation: SUBMIT_REVIEW,
            mutationOptions: {
              variables: {
                bookingId: trip.id
              },
              // NOTE: for the scope of this project, we've opted for the simpler refetch approach
              // another, more optimized option is to update the cache directly -- https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly
              refetchQueries: [{query: PAST_GUEST_TRIPS}]
            }
          }}
        />
      ) : null}
    </OuterContainer>
  );
}

Trip.propTypes = {
  trip: PropTypes.object,
  isPast: PropTypes.bool
};

export default function Trips({trips, isPast = false}) {
  const {pathname} = useLocation();

  return (
    <>
      <Heading as="h1" mb="4">
        My Trips
      </Heading>
      <Box
        as="nav"
        w="full"
        mb="4"
        fontSize="lg"
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
      >
        <Link
          as={RouterLink}
          to="/trips"
          mr="8"
          fontWeight={pathname === '/trips' ? 'bold' : 'normal'}
        >
          My Trips
        </Link>
        <Link
          as={RouterLink}
          to="/past-trips"
          fontWeight={pathname === '/past-trips' ? 'bold' : 'normal'}
        >
          Past Trips
        </Link>
      </Box>

      <VStack spacing="4">
        {trips.map((trip, i) => {
          return (
            <Trip
              key={`${trip.listing.title}-${i}`}
              trip={trip}
              isPast={isPast}
            />
          );
        })}
      </VStack>
    </>
  );
}

Trips.propTypes = {
  trips: PropTypes.array.isRequired,
  isPast: PropTypes.bool
};
