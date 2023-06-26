import { useState, useEffect, useRef } from 'react';
import {Frame, Day, Header, Button, Body, Column, WorkBlock, Hours, BodyWork, FooterBlock, HeaderBlock, Months} from "./StComponents"
import Workarea from './Workarea';

function App() {

  
  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_OF_THE_WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                           'October', 'November', 'December'];

  

  
  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
  const [week, setWeek] = useState([]);
  const wrapperRef = useRef(null);
  const deleteRef = useRef(null);
  const [childrens, setChildrens] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [interwiewToDelete, setInterwiewToDelete] = useState(null);

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
    setWeek(createWeek(date));
    setChildrens(Array.from(wrapperRef.current.children));
  }, [date]);

  function createWeek(date) {
    let startDate = new Date().getDay();
    startDate =  (startDate == 0) ? 7 : startDate;
    let newArr3 = Array.from({ length: 7 }, 
        (_, i) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - startDate + 1 + i).getDate());

    console.log("hello: ", newArr3);
 
    return newArr3;
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const days = isLeapYear(year) ? DAYS_LEAP : DAYS;

  function getStartDayOfMonth(date) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return startDate === 0 ? 7 : startDate;
  }

  const plusButton = () => {
    let workPlan = prompt("Enter event time\nYYYY-MM-DD HH:mm:ss", "");
    let workTime = (workPlan != null) ? new Date(workPlan) : null;
    let myDay = (workTime.getDay() == 0) ? 6 : workTime.getDay()-1;
    let myHours = workTime.getHours();
    let index = myHours*7 + myDay;
    childrens[myHours*7 + myDay].style.backgroundColor = "#e3e4fd";
    setInterviews([...interviews, index]);
    // console.log("Plus button: ", interviews);
  }

  const workBgrnd = (index, data) => {
    if (data.includes(index)) {
      childrens[index].style.backgroundColor = "#b3b7ff";
      deleteRef.current.style.display = 'flex';
      setInterwiewToDelete(index);
    }
    console.log("Data: ", data);
  }

  const deleteInterview = (indexToDelete) => {
    childrens[indexToDelete].style.backgroundColor = "transparent";
    deleteRef.current.style.display = 'none';
    setInterviews(interviews.filter(item => item !== indexToDelete));
  }

  return (
    <Frame>
      <Header key={'1'} initial ref ={wrapperRef}>
        <HeaderBlock key={'1'}>Interview Calendar</HeaderBlock>
        <HeaderBlock plus key={'2'} onClick={plusButton}>+</HeaderBlock>
      </Header>
      <Header key={'2'}>
        <Column></Column>
        <Body initial>
          {DAYS_OF_THE_WEEK.map((d) => (
            <Day weekday key={d.toString()}>
              {d}
            </Day>
          ))}
        </Body>
      </Header>
      <Header key={'3'}>
        <Column></Column>
        <Body initial>
          {week.map(i => {
                  const todayCheck = new Date();
                  if ((i == todayCheck.getDate() && month == todayCheck.getMonth())) {
                    return (
                      <Day today key={i.toString()}>
                        <strong>{i}</strong>
                      </Day>
                    );
                  } else {
                    return (
                      <Day key={i.toString()}>
                        <strong>{i}</strong>
                      </Day>
                    );
                  }
          })}
        </Body>
      </Header>
      <Header key={'4'}>
        <Column></Column>
        <Body initial>
          <Button key={'1'} onClick={() => setDate(new Date(year, month, day - 7))}>{'<'}</Button>
          <Months>
            {MONTHS[month]} {year}
          </Months>
          <Button key={'2'} onClick={() => setDate(new Date(year, month, day + 7))}>{'>'}</Button>
        </Body>
      </Header>
      <Workarea giveRef={wrapperRef} workBgrnd={workBgrnd} data={interviews}></Workarea>
      <Header key={'5'} initial footer>
        <FooterBlock key={'1'} onClick={() => setDate(new Date())}>Today</FooterBlock>
        <FooterBlock key={'2'} deleteBtn ref={deleteRef} onClick={() => deleteInterview(interwiewToDelete)}>Delete</FooterBlock>
      </Header>
    </Frame>
    
  );
}

export default App;
