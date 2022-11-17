import React from "react";
import { getSession } from "@auth0/nextjs-auth0";

import ClientsList from 'containers/clients/ClientList'
import SubAdmin from "layouts/SubAdmin";


export default function Projects() {

  return (
    <>
     <ClientsList />
    </>
  );
}

Projects.layout = SubAdmin;

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