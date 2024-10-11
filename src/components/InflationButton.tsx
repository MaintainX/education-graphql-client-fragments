import { gql, useApolloClient } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import { Listing } from "../__generated__/types";
import { GetFeaturedListingsForInflationQuery } from "./__generated__/InflationButton.types";

/* Exercise 1
 *
 * Docs on cache.readQuery:
 * https://www.apollographql.com/docs/react/caching/cache-interaction#readquery
 */

export function InflationButton() {
  const { cache } = useApolloClient();

  return (
    <Button
      position="fixed"
      bottom="2rem"
      right="2rem"
      size="lg"
      onClick={() => {
        const featuredListingsCacheQuery = gql`
          query GetFeaturedListingsForInflation {
            featuredListings {
              id
              costPerNight
            }
          }
        `;
        const data = cache.readQuery<GetFeaturedListingsForInflationQuery>({
          query: featuredListingsCacheQuery,
        });

        data?.featuredListings.forEach((listing) => {
          cache.modify<Listing>({
            id: cache.identify(listing),
            fields: {
              costPerNight: (existingCostPerNight) =>
                Math.round(existingCostPerNight * 1.1),
            },
          });
          return {
            ...listing,
            costPerNight: Math.round(listing.costPerNight * 1.1),
          };
        });

        // cache.writeQuery({
        //   query: featuredListingsCacheQuery,
        //   data: {
        //     featuredListings: inflatedCosts,
        //   },
        // });
      }}
    >
      $$$ Inflate costs $$$
    </Button>
  );
}
