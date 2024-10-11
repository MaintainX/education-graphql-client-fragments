import * as GraphQLTypes from "../../__generated__/types";

export type GetFeaturedListingsForInflationQueryVariables = GraphQLTypes.Exact<{
  [key: string]: never;
}>;

export type GetFeaturedListingsForInflationQuery = {
  featuredListings: Array<{
    __typename: "Listing";
    id: string;
    costPerNight: number;
  }>;
};
