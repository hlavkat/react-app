import styled from "styled-components";

export const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  background-color: black;
`;
export const EmployeesList = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  background-color: transparent;
`;
export const Employees = styled.div`
  display: flex;
  height: 45px;
  padding: 0 15px;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  ${(props) => {
    if (props.gender === "woman") {
      return `
            background-color: yellow;  
        `;
    }
  }}
`;
export const EmployeeForm = styled(EmployeesList)`
  flex-direction: row;
  margin: 50px 0;
  padding-top: 0;
  justify-content: space-between;
  align-items: center;
`;
export const Input = styled.input`
  width: 130px;
  height: 25px;
  padding-left: 10px;
`;
export const RadioForm = styled(EmployeeForm)`
  flex-direction: column;
  text-align: center;
`;
export const Label = styled.label`
  background-color: white;
  color: black;
  padding: 0 5px;
  margin: 5px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: green;
  }
`;
export const InputRadio = styled(Input)`
  height: 12px;
`;
export const Button = styled.button`
  background-color: green;
  color: black;
  border: none;
  box-shadow: 0 0 10px white;
  border-radius: 3px;
  padding: 5px 15px;
  cursor: pointer;
  &:disabled {
    background-color: red;
    cursor: not-allowed;
  }
`;
export const RemoveButton = styled.button`
  width: 25px;
  padding: 5px;
  background-color: red;
  color: black;
  font-weight: bolder;
  box-shadow: 0 0 10px red;
  border: none;
  border-radius: 100%;
  text-align: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: all 0.3s linear;
    background-color: black;
    color: white;
    box-shadow: 0 0 10px black;
  }
`;
export const Buttons = styled(EmployeeForm)`
  margin: 30px 0;
  height: 40px;
`;
export const TabButton = styled.button`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 48%;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 10px white;
  color: white;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
  ${(props) => {
    if (props.name === props["data-active"]) {
      return `
            background-color: white;
            color: black;   
        `;
    }
  }}
  &:hover {
    background-color: white;
    color: black;
    box-shadow: 0 0 20px red;
  }
`;
