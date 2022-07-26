import React from "react";
import { gql, useQuery } from "@apollo/client";

// components
//import {Table} from "components/Cards/Table";

// layout for page
import Admin from "layouts/Admin.js";

const AllCollaboratorsQuery = gql`
  query {
    collaborator {
      id
      name
      lastName
    }
  }
`;

export default function Collaborators() {
  const { data, loading, error } = useQuery(AllCollaboratorsQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  console.log(loading, data);

  const columns = [{title: "Name"} , { title: "Last Name" }];

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          {/*<Table columns={columns} color="dark"  title="Colaboradores"  />*/}
        </div>
      </div>
    </>
  );
}

Collaborators.layout = Admin;
