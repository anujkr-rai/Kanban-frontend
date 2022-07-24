import { Search } from "@material-ui/icons";
import styled from "styled-components";
import React, { useEffect,useState } from "react";


const Container = styled.div`
  height: 100px;
  margin-left:30px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Left = styled.div`
  flex: 1;
`;
const Logo = styled.h1`
  font-weight: 450;
  margin: 0;
`;
const Desc = styled.span`
  font-weight: 400;
`;

const Right = styled.div`
  flex: 1;
  margin-left: 1000px
`;
const SearchContainer = styled.div`
  width: 60%;
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  cursor: pointer;
`;
const Input = styled.input`
  border: none;
  flex: 1;
  outline: none;
`;
const Button=styled.button``;

const Navbar = (props) => {

  const handleLogout = ()=>{
    localStorage.clear();
    window.location.reload();
  }

  let [users,setUsers] = useState([]);

  useEffect(()=>{
    (async () => {
      let res  = await fetch('http://localhost:8081/getAllUsers', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    
let allUsers = await res.json();

//console.log(allUserTasks);
 setUsers(allUsers);
    })()
  },[])

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>Kanban Board</Logo>
          <Desc>Buzz Aldrin's tasks</Desc>
        </Left>
        <Right>
          {/* <SearchContainer>
            <Input placeholder="Search..." />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer> */}
          <Button onClick={handleLogout}>Logout</Button>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
