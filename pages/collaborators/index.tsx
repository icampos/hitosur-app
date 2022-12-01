import React from "react";
import { getSession } from "@auth0/nextjs-auth0";

import CollaboratorList from 'containers/collaborators/index'
import SubAdmin from "layouts/SubAdmin";


export default function Collaborators() {

  return (
    <>
     <CollaboratorList />
    </>
  );
}

Collaborators.layout = SubAdmin;

export const getServerSideProps = async ({ req, res }) => {
    const session = getSession(req, res);
    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: "/api/auth/login",
        },
        props: {},
      };
    }
  
    return {
      props: {},
    };
  };
