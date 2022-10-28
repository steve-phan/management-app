import { useState } from "react";
import { Spin } from "antd";
import generateCalendar from "antd/es/calendar/generateCalendar";
import dayjs, { Dayjs } from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";

import { useGetAllAppointments } from "src/hooks";

import { DataCell } from "./DataCell";
import { HeaderCalendar } from "./HeaderCalendar";
import { getCurrentMonth } from "../shared/custom-dayjs";
import { AppointmentDetails } from "./AppointmentDetails/AppointmentDetails";
import { useAppSelector } from "src/store/hooks";
import { ViewMoreAppointments } from "./ViewMoreAppointments/ViewMoreAppointments";

const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);

export const EventsCalendar = (): JSX.Element => {
  const [rangeQuery, setRangeQuery] = useState(dayjs().format());

  const { data, isLoading } = useGetAllAppointments(rangeQuery);
  const { appointmentDetailsModal, viewMoreAppointmentsModal } = useAppSelector(
    (state) => ({
      appointmentDetailsModal:
        state.calendar.calendarModal.APPOINTMENT_DETAILS.open,
      viewMoreAppointmentsModal:
        state.calendar.calendarModal.VIEW_MORE_APPOINTMENTS.open,
    })
  );

  const handleChange = (event: Dayjs) => {
    setRangeQuery(event.format());
  };

  if (isLoading && rangeQuery === getCurrentMonth() && !data) {
    return <Spin />;
  }
  return (
    <>
      {appointmentDetailsModal && <AppointmentDetails />}
      {viewMoreAppointmentsModal && <ViewMoreAppointments />}
      <Calendar
        onChange={handleChange}
        className="bookable24"
        dateFullCellRender={(value) => {
          return (
            <div className="ant-picker-cell-inner ant-picker-calendar-date">
              <div
                className="ant-picker-calendar-date-value"
                onClick={() => {
                  console.log("ADD A NEW EVENT");
                }}
              >
                {value.date()}
              </div>
              <div className="ant-picker-calendar-date-content">
                <DataCell
                  value={value}
                  appointments={data?.data?.appointments}
                />
              </div>
            </div>
          );
        }}
        headerRender={({ value, type, onChange, onTypeChange }) => (
          <HeaderCalendar
            value={value}
            type={type}
            onChange={onChange}
            onTypeChange={onTypeChange}
            isLoading={isLoading}
            totalAppointments={data?.data?.appointments?.length}
          />
        )}
        onSelect={handleChange}
      />
    </>
  );
};
