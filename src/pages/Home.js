import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Tasks from "../components/Tasks";
import CreatePopup from "../components/CreatePopup";
import EditPopup from "../components/EditPopup";

const Home = (props) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing,setIsEditing] = useState(false);
  const [editing,setEditing] = useState({});
  const {routeProps} = props;
  console.log(editing);

  return (
    <div>
      {(isCreating) && (
        <CreatePopup isCreating={isCreating} setIsCreating={setIsCreating} isEditing={isEditing} setIsEditing={setIsEditing} routeProps={routeProps} />
      )}
      {(isEditing) && (
        <EditPopup isEditing={isEditing} setIsEditing={setIsEditing} routeProps={routeProps} editing={editing} setEditing={setEditing} />
      )}
      <Navbar/>
      <Tasks isCreating={isCreating} setIsCreating={setIsCreating} isEditing={isEditing} setIsEditing={setIsEditing} editing={editing} setEditing={setEditing}  />
    </div>
  );
};

export default Home;
