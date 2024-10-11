import * as GraphQLTypes from "../../__generated__/types";

export type GetListingDetailsQueryVariables = GraphQLTypes.Exact<{
  id: GraphQLTypes.Scalars["ID"]["input"];
}>;

export type GetListingDetailsQuery = {
  listing: {
    __typename: "Listing";
    id: string;
    title: string;
    description: string;
    photoThumbnail: string;
    numOfBeds: number;
    costPerNight: number;
    locationType: GraphQLTypes.LocationType;
    overallRating: number | null;
    amenities: Array<{
      __typename: "Amenity";
      name: string;
      category: GraphQLTypes.AmenityCategory;
    } | null>;
    reviews: Array<{
      __typename: "Review";
      text: string;
      rating: number;
      author:
        | {
            __typename: "Guest";
            id: string;
            name: string;
            profilePicture: string;
          }
        | {
            __typename: "Host";
            id: string;
            name: string;
            profilePicture: string;
          };
    } | null>;
    host: {
      __typename: "Host";
      id: string;
      name: string;
      profilePicture: string;
      profileDescription: string;
      overallRating: number | null;
    };
    bookings: Array<{
      __typename: "Booking";
      id: string;
      checkInDate: string;
      checkOutDate: string;
    } | null>;
  } | null;
};

export type MeFragment = {
  me: { __typename: "Guest"; id: string } | { __typename: "Host"; id: string };
};
