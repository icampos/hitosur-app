import React, { useState } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

// components
import { CardSettings } from "components/Forms/CardSettings";
import CardProfile from "components/Cards/CardProfile.js";
import { ClientForm } from "../../../components/Forms/projectForm";
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
    }
  }
`;

export default function Details() {
  const router = useRouter();
  const { client_id } = router.query;
  console.log(client_id)
  const { data, loading, error } = useQuery(ClientsQuery, {
    variables: {id: client_id}
  });
 
  const [isDisabled, setIsDisabled] = useState(true);

  const { name, lastName, email, phone, status, notes, address } = data?.customer || {};
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
          <CardProfile />
        </div>
      </div>
    </>
  );
}

Details.layout = SubAdmin;
