import React from "react";

const UserProfile = (props) => {
  return <div>{props.name}</div>;
};

export default UserProfile;

export async function getServerSideProps(context) {

  const { params, req, res } = context

  console.log("server side code");

  return {
    props: {
      name: "Max"
    }
  }
}