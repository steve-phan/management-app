import { useState } from "react";
import { Spin } from "antd";
import generateCalendar from "antd/es/calendar/generateCalendar";
import { Dayjs } from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";

import { useGetAllAppointments } from "src/hooks";

import { getCurrentMonth } from "../shared/custom-dayjs";
import { DataCell } from "./DataCell";
import { HeaderCalendar } from "./HeaderCalendar";

const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);

export const EventsCalendar = (): JSX.Element => {
  const [monthQuery, setMonthQuery] = useState(getCurrentMonth());

  const { data, isLoading } = useGetAllAppointments(monthQuery);

  const handleChange = (event: Dayjs) => {
    setMonthQuery(getCurrentMonth(event));
  };

  if (isLoading && monthQuery === getCurrentMonth() && !data) {
    return <Spin />;
  }

  return (
    <Calendar
      onChange={handleChange}
      className="bookable24"
      dateCellRender={(value) => (
        <DataCell value={value} appointments={data?.data?.appointments} />
      )}
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
    />
  );
};
