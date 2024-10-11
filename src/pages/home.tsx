import {
  gql,
  TypedDocumentNode,
  useSuspenseQuery
} from "@apollo/client";

import "react-datepicker/dist/react-datepicker.css";
import { FeaturedListingContainer } from "../components/FeaturedListingContainer";
import { FeaturedListingTitle } from "../components/FeaturedListingTitle";
import { HomePageHero } from "../components/HomePageHero";
import { InflationButton } from "../components/InflationButton";
import { ListingItem } from "../components/ListingItem";
import { ListingList } from "../components/ListingList";
import {
  GetFeaturedListingsQuery,
  GetFeaturedListingsQueryVariables,
} from "./__generated__/home.types";

export const FEATURED_LISTINGS: TypedDocumentNode<
  GetFeaturedListingsQuery,
  GetFeaturedListingsQueryVariables
> = gql`
  query GetFeaturedListings {
    featuredListings {
      id
      ...ListingItem_listing @nonreactive
    }
  }

  ${ListingItem.fragments.listing}
`;

export function Home() {
  const { data } = useSuspenseQuery(FEATURED_LISTINGS);

  return (
    <>
      <HomePageHero />
      <FeaturedListingContainer>
        <FeaturedListingTitle>
          Ideas for your next stellar trip
        </FeaturedListingTitle>
        <ListingList>
          {data.featuredListings.map((listing) => (
            <ListingItem key={listing.id} listing={listing} />
          ))}
        </ListingList>
      </FeaturedListingContainer>
      <InflationButton />
    </>
  );
}
