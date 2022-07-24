import React, { useEffect,useState } from "react";
import styled from "styled-components";
import Task from "./Task";

const Container = styled.div`
  padding: 0 0 30px 30px;
`;
const Wrapper = styled.div``;
const Button = styled.button`
 
  color: blue;
  margin: 0 8px;
  border: 2px solid Blue;
  border-radius: 3px;
`;
const TaskGroups = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 80px
`;
const Title = styled.span`
  margin-left: 95px;
`;
const Left = styled.div`
  flex: 1;
  margin-right: 100px;
`;
const LeftDiv = styled.div`
  width: 100%;
  height: 70vh;
  background-color: #EEEEEE;
  border-radius: 12px;
  margin-top: 15px;
  padding: 3px;
  overflow-y:scroll;

`;
const Center = styled.div`
  flex: 1;
  margin-right: 100px;
`;
const CenterDiv = styled.div`
  width: 100%;
  height: 70vh;
  background-color: #EEEEEE;
  border-radius: 12px;
  margin-top: 15px;
  padding: 3px;
  overflow-y:scroll;

`;
const Right = styled.div`
  flex: 1;
  margin-right: 80px;
`;
const RightDiv = styled.div`
  width: 100%;
  height: 70vh;
  background-color: #EEEEEE;
  border-radius: 12px;
  margin-top: 15px;
  padding: 3px;
  overflow-y:scroll;

`;

const Tasks = (props) => {
  const { isCreating, setIsCreating,isEditing,setIsEditing,routeProps,editing,setEditing } = props;
  let [userTasks,setUserTasks] = useState([]);

  useEffect(()=>{
    (async () => {
      let res  = await fetch(`https://demokanbanback.herokuapp.com/getUserTask/${localStorage.getItem("user_id")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    
let allUserTasks = await res.json();
//console.log(allUserTasks);
 setUserTasks(allUserTasks);
    })()
  },[])

  //console.log(userTasks);
  const notStarted = userTasks.filter(task => {
    return task.status === 'Not Started';
  });
console.log(notStarted)

const completed = userTasks.filter(task => {
  return task.status === 'Completed';
});
console.log(completed)

const inProgress = userTasks.filter(task => {
  return task.status === 'In Progress';
});
console.log(inProgress)




  return (
    <Container>
      <Wrapper>
        <Button onClick={() => setIsCreating(true)}>Create</Button>
        <TaskGroups>
          <Left>
            <Title>Not Started({notStarted.length})</Title>
            <LeftDiv>
              {notStarted.map((task)=>(
                <Task key={task.taskID} {...task} isEditing={isEditing} setIsEditing={setIsEditing} editing={editing} setEditing={setEditing} />
              ))}
            </LeftDiv>
          </Left>
          <Center>
            <Title>In Progress({inProgress.length})</Title>
            <CenterDiv>
            {inProgress.map((task)=>(
                <Task key={task.taskID} {...task} editing={editing} setEditing={setEditing} isEditing={isEditing} setIsEditing={setIsEditing} />
              ))}
            </CenterDiv>
          </Center>
          <Right>
            <Title>Completed({completed.length})</Title>
            <RightDiv>
            {completed.map((task)=>(
                <Task key={task.taskID} {...task} editing={editing} setEditing={setEditing} isEditing={isEditing} setIsEditing={setIsEditing}/>
              ))}
            </RightDiv>
          </Right>
        </TaskGroups>
      </Wrapper>
    </Container>
  );
};

export default Tasks;
