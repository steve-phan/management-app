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

const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);

export const EventsCalendar = (): JSX.Element => {
  const [rangeQuery, setRangeQuery] = useState(dayjs().format());

  const { data, isLoading } = useGetAllAppointments(rangeQuery);

  const handleChange = (event: Dayjs) => {
    setRangeQuery(event.format());
  };

  if (isLoading && rangeQuery === getCurrentMonth() && !data) {
    return <Spin />;
  }
  return (
    <>
      <AppointmentDetails />
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
