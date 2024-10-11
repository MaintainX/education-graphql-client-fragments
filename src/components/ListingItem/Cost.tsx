import { gql, useFragment } from "@apollo/client";
import { Flex, Text } from "@chakra-ui/react";
import { ListingItemCost_listingFragment } from "./__generated__/Cost.types";

interface ListingItemCostProps {
  listing: ListingItemCost_listingFragment;
}

export function ListingItemCost({ listing: _listing }: ListingItemCostProps) {
  const fragment = useFragment<ListingItemCost_listingFragment>({
    fragment: ListingItemCost.fragments.listing,
    from: _listing,
  });
  if (!fragment.complete) {
    return null;
  }
  const listing = fragment.data;
  return (
    <Flex fontSize="lg" ml={6}>
      <Text fontWeight="bold"> ¤ {listing.costPerNight}</Text> / night
    </Flex>
  );
}

ListingItemCost.fragments = {
  listing: gql`
    fragment ListingItemCost_listing on Listing {
      id
      costPerNight
    }
  `,
};
