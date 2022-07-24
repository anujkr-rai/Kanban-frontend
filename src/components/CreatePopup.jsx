import React, { useState } from "react";
import styled from "styled-components";
import useInputState from "../hooks/useInputState";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
const axios = require('axios').default;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(200, 200, 200, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 40%;
  height: 60%;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  justify-content: space-between;
`;

const Form = styled.form``;

const UpperDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TitleEditDiv = styled.div``;
const TitleDiv = styled.div`
  display: flex;
  flex: 2;
  justify-content: space-between;
`;

const Title = styled.h3`
  padding: 0;
  margin: 0;
`;
const CloseBtn = styled.div`
  cursor: pointer;
  flex: 1;
  display: flex;
  justify-content: end;
  
`;

const ContentDiv = styled.div`
  display: flex;
  margin-top: 20px;
`;
const Left = styled.div`
  flex: 2;
`;
const Label = styled.label``;
const TextArea = styled.textarea`
  width: 90%;
  height: 40vh;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
`;
const Input = styled.input``;

const ButtonsDiv = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: end;
`;
const Button = styled.button`
  margin: 0 10px;
`;
const Select = styled.select``;


const CreatePopup = (props) => {
  const { isCreating, setIsCreating,isEditing,setIsEditing, routeProps} = props;
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const [title, handleTitleChange, resetTitle] = useInputState("");
  const [desc, handleDescChange, resetDesc] = useInputState("");
  const [status, handleStatusChange, resetStatus] = useInputState("");
  const [priority, handlePriorityChange, resetPriority] = useInputState("");
  const [deadline, handleDeadlineChange, resetDeadline] =useInputState("");

  const toSend = {
    "task_name": title,
    "details": desc,
    "priority": priority,
    "deadline": deadline,
    "status": status,
    "userID": localStorage.getItem("user_id")
  }
  

  const handleSubmit =async (e) => {
    e.preventDefault();
try{
  const res = await axios.post('http://localhost:8081/createTask',{
    ...toSend
  },
  {headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }});
  console.log(res);
  setIsCreating(false);
  routeProps.history.push("/");
}catch(err){
  console.log(err);
}
    
    
  };

  return (
    <Container
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
      }}
    >
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <Form>
          <UpperDiv>
            <InputDiv>
            <Label>Title</Label>
              <Input value={title} onChange={handleTitleChange}></Input>
              </InputDiv>

            <CloseBtn >
              <CloseOutlinedIcon onClick={() => {setIsCreating(false);setIsEditing(false);}}/>
            </CloseBtn>
          </UpperDiv>
          <ContentDiv>
            <Left>
              <Label>Description</Label>
              <TextArea value={desc} onChange={handleDescChange}></TextArea>
            </Left>
            <Right>
              <InputDiv>
                <Label>Status</Label>
                <Select value={status} onChange={handleStatusChange}>
                <option value="" hidden>
          Select
        </option>
              <option  value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
      </Select>
              </InputDiv>
              <InputDiv>
                <Label>Priority</Label>
                <Select value={priority} onChange={handlePriorityChange}>
                <option value="" hidden>
          Select
        </option>
              <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
      </Select>
              </InputDiv>
              <InputDiv>
                <Label>Deadline</Label>
                <Input
                type="date"
                  value={deadline}
                  onChange={handleDeadlineChange}
                ></Input>
              </InputDiv>
            </Right>
          </ContentDiv>
          <ButtonsDiv>
            <Button onClick={() => {setIsCreating(false) ;setIsEditing(false);}}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
          </ButtonsDiv>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default CreatePopup;