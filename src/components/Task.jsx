import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 13px;
  padding: 8px;
  background-color: white;
  border-radius: 12px;
  font-family: 'Inter';
  font-style: normal;
`;
const Title = styled.h4`
  margin: 0;
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 18px;
`;
const Content = styled.div``;
const ContentText = styled.span`
  font-weight: 400;
  font-size: 12px;
`;
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;
const FooterText = styled.span`
  display: flex;
  align-items: center;
`;
const Priority = styled.span`
  font-weight: 300;
  margin: 0 5px;
`;
const Level = styled.span`
  font-weight: 300;
  background-color: #EEEEEE;
  margin: 0 5px 2px 5px;
  padding: 0 9px;
  border-radius: 10px;
`;

const Task = (props) => {
 const {isEditing,setIsEditing,task_name,details,priority,taskID,editing,setEditing,status,deadline} = props;
 console.log(props);
  
 let prio;
 if(priority===1){
  prio="Low";
 }else if(priority===2){
  prio="Medium"
 }
 else if(priority===3){
  prio="High"
 }else{
  prio="Urgent"
 }

 const handleEditClick =  ()=>{
  setEditing({
    task_name:task_name,
    details:details,
    priority:priority,
    taskID:taskID,
    status:status,
    deadline:deadline
  })
  //console.log(taskID);
  setIsEditing(true);
}

  return (
    <Container onClick={handleEditClick}>
      <Title>{task_name}</Title>
      <Content>
        <ContentText>
          {details}
        </ContentText>
      </Content>
      <Footer>
        <FooterText>
          <Priority>{prio}</Priority>
          <Level>{priority}</Level>
        </FooterText>
      </Footer>
    </Container>
  );
};

export default Task;
