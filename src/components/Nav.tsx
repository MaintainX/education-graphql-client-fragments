import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
import { HStack } from "@chakra-ui/react";
import { GuestNav } from "./GuestNav";
import { HostNav } from "./HostNav";
import { LoginButton } from "./LoginButton";
import { Logo } from "./Logo";
import { NavAvatar } from "./NavAvatar";
import { NavContainer } from "./NavContainer";
import {
  GetMyProfileQuery,
  GetMyProfileQueryVariables,
} from "./__generated__/Nav.types";

const GET_PROFILE: TypedDocumentNode<
  GetMyProfileQuery,
  GetMyProfileQueryVariables
> = gql`
  query GetMyProfile {
    me {
      id
      profilePicture
      # ... on Guest {
      #   funds
      # }
    }
  }
`;

export function Nav() {
  const { data } = useSuspenseQuery(GET_PROFILE, { errorPolicy: "ignore" });
  const user = data?.me;

  return (
    <NavContainer>
      <Logo />
      <HStack spacing="2">
        {user ? (
          <>
            {user.__typename === "Guest" && <GuestNav user={user} />}
            {user.__typename === "Host" && <HostNav />}
            <NavAvatar src={user.profilePicture} />
          </>
        ) : (
          <LoginButton />
        )}
      </HStack>
    </NavContainer>
  );
}
