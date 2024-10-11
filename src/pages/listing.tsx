import BookStay from "../components/BookStay";

import { gql, TypedDocumentNode, useFragment, useQuery } from "@apollo/client";
import { Center, Divider, Flex, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ListingAmenities } from "../components/Listing/Amenities";
import { ListingDescription } from "../components/Listing/Description";
import { ListingDetails } from "../components/Listing/Details";
import { ListingHeader } from "../components/Listing/Header";
import { ListingHostDetails } from "../components/Listing/HostDetails";
import { ListingImage } from "../components/Listing/Image";
import { ListingReviews } from "../components/Listing/Reviews";
import { PageContainer } from "../components/PageContainer";
import { PageError } from "../components/PageError";
import { PageSpinner } from "../components/PageSpinner";
import {
  GetListingDetailsQuery,
  GetListingDetailsQueryVariables,
  MeFragment,
} from "./__generated__/listing.types";
import { GUEST_TRIPS } from "./upcoming-trips";

const LISTING: TypedDocumentNode<
  GetListingDetailsQuery,
  GetListingDetailsQueryVariables
> = gql`
  query GetListingDetails($id: ID!) {
    listing(id: $id) {
      id
      title
      description
      photoThumbnail
      numOfBeds
      costPerNight
      locationType
      amenities {
        name
        category
      }
      overallRating
      reviews {
        text
        author {
          id
          name
          profilePicture
        }
        rating
      }
      host {
        id
        name
        profilePicture
        profileDescription
        overallRating
      }
      bookings {
        id
        checkInDate
        checkOutDate
      }
    }
  }
`;

const meFragment = gql`
  fragment Me on Query {
    me {
      id
    }
  }
`;

export function Listing() {
  const { id: idParam } = useParams();

  const { data, loading, error } = useQuery(LISTING, {
    variables: { id: idParam! },
  });
  const fragment = useFragment<MeFragment>({ fragment: meFragment, from: {} });
  const user = fragment.complete ? fragment.data.me : null;

  if (loading) {
    return <PageSpinner />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  if (!data?.listing) {
    return <Center>Listing not found</Center>;
  }

  const { listing } = data;

  return (
    <PageContainer>
      <Stack direction="column" mb="12" spacing="6">
        <ListingHeader
          canEditListing={listing.host.id === user?.id}
          listing={listing}
        />
        <ListingImage src={listing.photoThumbnail} />
        <Flex direction="row" flexWrap="wrap">
          <Stack flex="1" direction="column" spacing="6" mr={8}>
            <ListingDetails listing={listing} />
            <Divider />
            <ListingDescription listing={listing} />
            <Divider />
            <ListingAmenities amenities={listing.amenities.filter(Boolean)} />
            <Divider />
            <ListingHostDetails host={listing.host} />
            <Divider />
            <ListingReviews reviews={listing.reviews.filter(Boolean)} />
          </Stack>

          <BookStay
            listing={listing}
            refetchQueries={[LISTING, { query: GUEST_TRIPS }]}
            userRole={user?.__typename}
          />
        </Flex>
      </Stack>
    </PageContainer>
  );
}
