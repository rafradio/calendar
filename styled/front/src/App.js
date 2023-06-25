import { useState, useEffect, useRef } from 'react';
import {Frame, Day, Header, Button, Body, Column, WorkBlock, Hours, BodyWork, FooterBlock} from "./StComponents"
import Workarea from './Workarea';

function App() {

  
  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_OF_THE_WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const days = isLeapYear(year) ? DAYS_LEAP : DAYS;

  
  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
  const [week, setWeek] = useState([]);
  const wrapperRef = useRef(null);
  const [childrens, setChildrens] = useState([]);

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

  function getStartDayOfMonth(date) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return startDate === 0 ? 7 : startDate;
  }

  const plusButton = () => {
    let workPlan = prompt("Enter event time\nYYYY-MM-DD HH:mm:ss", "");
    let workTime = (workPlan != null) ? new Date(workPlan) : null;
    // let myDay = workTime.getDay();
    let myDay = (workTime.getDay() == 0) ? 6 : workTime.getDay()-1;
    let myHours = workTime.getHours();
    childrens[myHours*7 + myDay].style.backgroundColor = "#f5f6fa";
    console.log("Plus button: ", workTime);
  }

  return (
    <Frame>
      <Header initial ref ={wrapperRef}>
        <div>Interview Calendar</div>
        <div onClick={plusButton}>+</div>
      </Header>
      <Header>
        <Column></Column>
        <Body initial>
          {DAYS_OF_THE_WEEK.map((d) => (
            <Day key={d}>
              {d}
            </Day>
          ))}
        </Body>
      </Header>
      <Header>
        <Column></Column>
        <Body initial>
          {week.map(i => {
                  const todayCheck = new Date();
                  if ((i == todayCheck.getDate() && month == todayCheck.getMonth())) {
                    return (
                      <Day today key={i}>
                        <strong>{i}</strong>
                      </Day>
                    );
                  } else {
                    return (
                      <Day key={i}>
                        <strong>{i}</strong>
                      </Day>
                    );
                  }
          })}
        </Body>
      </Header>
      <Header>
        <Column></Column>
        <Body initial>
          <Button onClick={() => setDate(new Date(year, month, day - 7))}>{'<'}</Button>
          <div>
            {MONTHS[month]} {year}
          </div>
          <Button onClick={() => setDate(new Date(year, month, day + 7))}>{'>'}</Button>
        </Body>
      </Header>
      <Workarea giveRef={wrapperRef}></Workarea>
      <Header initial>
        <FooterBlock>Today</FooterBlock>
        <FooterBlock>Delete</FooterBlock>
      </Header>
    </Frame>
    
  );
}

export default App;