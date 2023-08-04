import { useEffect, useState } from "react";
import {
  PageContainer,
  EmployeesList,
  Employees,
  EmployeeForm,
  Input,
  Label,
  InputRadio,
  RadioForm,
  Button,
  RemoveButton,
  Buttons,
  TabButton,
} from "./HomeStyle";
import employee from "../employeesData";
import "./Home.css";

const MAN = "man";
const WOMAN = "woman";

const Home = () => {
  const [listOfEmployees, setListOfEmployees] = useState(employee);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    surename: "",
    gender: "",
  });

  const [activeTab, setActiveTab] = useState("list-of-employees");

  const [valid, setValid] = useState(false);

  const getCountGender = (gender) => {
    return listOfEmployees.filter((e) => e.gender === gender).length;
  };

  const [men, setMen] = useState(getCountGender(MAN));
  const [women, setWomen] = useState(getCountGender(WOMAN));

  const validateData = (employee) => {
    if (
      employee.name === "" ||
      employee.surename === "" ||
      employee.gender === ""
    ) {
      return setValid(false);
    } else {
      return setValid(true);
    }
  };
  const handleChange = (event) => {
    const updateEmployee = {
      ...newEmployee,
      [event.target.name]: event.target.value,
    };
    setNewEmployee(updateEmployee);
  };
  const handleChangeGender = (event) => {
    const updateEmployee = {
      ...newEmployee,
      gender: event.target.name === MAN ? MAN : WOMAN,
    };
    setNewEmployee(updateEmployee);
  };

  useEffect(() => {
    validateData(newEmployee);
  }, [newEmployee]);

  //   useEffect(() => {
  //     console.log({
  //       calcmen: getCountGender(MAN),
  //       calcwomen: getCountGender(WOMAN),
  //       men,
  //       women,
  //     });
  //   });
  useEffect(() => {
    setMen(getCountGender(MAN));
    setWomen(getCountGender(WOMAN));
  }, [listOfEmployees]); //eslint-disable-line

  const handleAdd = () => {
    setListOfEmployees((listOfEmployees) => {
      return [
        ...listOfEmployees,
        {
          ...newEmployee,
          id:
            Math.max(0, ...listOfEmployees.map((employee) => employee.id)) + 1,
        },
      ];
    });
    const updateEmployee = {
      name: "",
      surename: "",
      gender: "",
    };
    setNewEmployee(updateEmployee);
  };

  const handleRemove = (employeeToRemove) => {
    const newListOfEmployees = listOfEmployees.filter((employee) => {
      return employee.id !== employeeToRemove;
    });
    setListOfEmployees(newListOfEmployees);
  };

  ///

  const [workValid, setWorkValid] = useState(false);

  const [workPlanning, setWorkPlanning] = useState({
    requiredMeters: "",
    timeLimit: "",
  });
  const handleCheck = (e) => {
    const updateWork = {
      ...workPlanning,
      [e.target.name]: e.target.value,
    };
    setWorkPlanning(updateWork);
  };
  const isWorkPossible = () => {
    const totalWork = men + women * 0.5;
    const workPossible = totalWork * parseFloat(workPlanning.timeLimit);
    return workPossible >= parseFloat(workPlanning.requiredMeters);
  };

  useEffect(() => {
    setWorkValid(isWorkPossible());
  }, [workPlanning, men, women]); //eslint-disable-line

  const handleMessage = () => {
    alert("Prace je naplanovana");
    setWorkPlanning({
      requiredMeters: "",
      timeLimit: "",
    });
  };

  return (
    <PageContainer>
      <Buttons>
        <TabButton
          name="list-of-employees"
          data-active={activeTab}
          onClick={() => setActiveTab("list-of-employees")}
        >
          List of Employees
        </TabButton>
        <TabButton
          name="tasks"
          data-active={activeTab}
          onClick={() => setActiveTab("tasks")}
        >
          Tasks
        </TabButton>
      </Buttons>
      {activeTab === "list-of-employees" && (
        <>
          <EmployeesList>
            {listOfEmployees.map((employee) => {
              return (
                <Employees key={employee.id} gender={employee.gender}>
                  {employee.name} {employee.surename} - {employee.gender}
                  <RemoveButton onClick={() => handleRemove(employee.id)}>
                    x
                  </RemoveButton>
                </Employees>
              );
            })}
          </EmployeesList>
          <EmployeeForm>
            <Input
              type="text"
              placeholder="Name"
              name="name"
              value={newEmployee.name}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Surename"
              name="surename"
              value={newEmployee.surename}
              onChange={handleChange}
            />
            <RadioForm>
              <Label>
                <InputRadio
                  type="radio"
                  name={MAN}
                  checked={newEmployee.gender === MAN}
                  onChange={handleChangeGender}
                />
                MEN
              </Label>
              <Label>
                <InputRadio
                  type="radio"
                  name={WOMAN}
                  onChange={handleChangeGender}
                  checked={newEmployee.gender === WOMAN}
                />
                WOMEN
              </Label>
            </RadioForm>
            <Button onClick={handleAdd} disabled={!valid}>
              Add Employee
            </Button>
          </EmployeeForm>
        </>
      )}
      {activeTab === "tasks" && (
        <div className="tasks">
          <h2>PLANNING EXCAVATION WORKS</h2>
          <p className="green">Men: {men}</p>
          <p className="green">Women: {women}</p>
          <label>
            <Input
              type="number"
              placeholder="Enter meters..."
              name="requiredMeters"
              min="0"
              value={workPlanning.requiredMeters}
              onChange={handleCheck}
            />
          </label>
          <label>
            <Input
              type="number"
              placeholder="Enter the hours..."
              name="timeLimit"
              min="0"
              value={workPlanning.timeLimit}
              onChange={handleCheck}
            />
          </label>

          <Button disabled={!workValid} onClick={handleMessage}>
            Work plainning
          </Button>
        </div>
      )}
    </PageContainer>
  );
};

export default Home;
