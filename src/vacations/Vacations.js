import React from 'react';
import BackButton from '../buttons/BackButton';
import EmployeeID from '../addNewAppointments/EmployeeID';
import Days from '../addNewAppointments/Days';
import Months from '../addNewAppointments/Months';
import Years from '../addNewAppointments/Years';
import DurationDays from './DurationDays';
import ConfirmMessage from '../addNewAppointments/ConfirmMessage';
import ConfirmDecline from '../addNewAppointments/ConfirmDecline';
import { FaPlus } from 'react-icons/fa';
import { format, add } from 'date-fns';

const Vacations = ({
    employeeID,
    allEmployees,
    schedule,
    startTime,
    durationDay,
    setNewAppointment,
    setStartTime,
    setEmployeeID,
    setDurationDay,
    newAppointment,
    setSubject,
    API_URI_schedule,
    setFetchError,
}) => {
    const handleNewVacation = (employeeID) => {
        const foundEmployee = allEmployees.find(
            (e) => e.employeeID === Number(employeeID)
        );
        if (foundEmployee) {
            const foundEmployeeName = foundEmployee.firstname;
            const foundNameEntry = schedule.find(
                (e) => e.name === foundEmployeeName
            );

            setNewAppointment({
                id: foundNameEntry.meetings[foundNameEntry.meetings.length - 1] //foundNameEntry.meetings.length -- better solution
                    .id
                    ? foundNameEntry.meetings[
                          foundNameEntry.meetings.length - 1
                      ].id + 1
                    : 1,
                startTime: format(
                    new Date(...Object.values(startTime)),
                    'HH:mm:ss dd/MM/yyyy'
                ),
                endTime: format(
                    add(new Date(...Object.values(startTime)), {
                        days: durationDay - 1,
                    }),
                    'HH:mm:ss dd/MM/yyyy'
                ),
                subject: durationDay + ' days Vacation',
            });
        }
    };
    return (
        <>
            <h2>Vacations</h2>
            <label htmlFor='vacation'>
                Enter Details of Your Future vecation
            </label>
            <EmployeeID
                setEmployeeID={setEmployeeID}
                employeeID={employeeID}
                allEmployees={allEmployees}
            />
            <Days startTime={startTime} setStartTime={setStartTime} />
            <Months startTime={startTime} setStartTime={setStartTime} />
            <Years startTime={startTime} setStartTime={setStartTime} />
            <DurationDays
                durationDay={durationDay}
                setDurationDay={setDurationDay}
            />
            <FaPlus
                className='button'
                type='submit'
                onClick={() => handleNewVacation(employeeID)}
            />
            <ConfirmMessage
                newAppointment={newAppointment}
                setStartTime={setStartTime}
                startTime={startTime}
                setDuration={setDurationDay}
            />
            {newAppointment.id ? (
                <ConfirmDecline
                    startTime={startTime}
                    setStartTime={setStartTime}
                    setDuration={setDurationDay} /* important */
                    employeeID={employeeID}
                    newAppointment={newAppointment}
                    schedule={schedule}
                    allEmployees={allEmployees}
                    setSubject={setSubject}
                    setNewAppointment={setNewAppointment}
                    API_URI_schedule={API_URI_schedule}
                    setFetchError={setFetchError}
                />
            ) : (
                <p>Please, fill all fields!</p>
            )}
            <BackButton
                startTime={startTime}
                setStartTime={setStartTime}
                setDuration={setDurationDay} /* important */
                setSubject={setSubject}
            />
        </>
    );
};

export default Vacations;

/* 
console.log(
    `Vacation/appointment for ${employeeID} is added successfully`
); */