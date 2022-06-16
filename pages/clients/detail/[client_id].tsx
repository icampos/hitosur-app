import React, { useState } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

// components
import { CardSettings } from "components/Forms/CardSettings";
import { CardProfile } from "components/Cards/CardProfileV2";
import { ClientForm } from "./form";
// layout for page
import SubAdmin from "layouts/SubAdmin.js";

const ClientsQuery = gql`
  query getCustomer($id: String!){
    customer(id: $id) {
      id
      name
      lastName
      email
      phone
      status
      projects {
        id
      address
      name
      address
      }
    }
  }
`;

export default function Details() {
  const router = useRouter();
  const { client_id } = router.query;
  const { data, loading, error } = useQuery(ClientsQuery, {
    variables: {id: client_id}
  });

  console.log(data)

  const [isDisabled, setIsDisabled] = useState(true);

  const { name, lastName, email, phone, status, notes, address, projects } = data?.customer || {};
  const client = {
    address: address,
    firstName: name,
    lastName: lastName,
    email: email,
    phone: phone, 
    status: status,
    notes: notes
  };
  const fullName = "Isaac Campos";

  console.log(projects)
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings
            title={fullName}
            buttonText={isDisabled ? "Editar" : "Guardar Cambios"}
            subtititle={"Client Information"}
            setIsDisabled = {setIsDisabled}
            status={status}
            isDisabled={isDisabled}
          >
            <ClientForm
              subtititle={"Client Information"}
              client={client}
              isDisabled={isDisabled}
            />
          </CardSettings>
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile projects={projects} />
        </div>
      </div>
    </>
  );
}

Details.layout = SubAdmin;
