import { Spin } from "antd";
import generateCalendar from "antd/es/calendar/generateCalendar";
import dayjs, { Dayjs } from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import React, { useEffect, useState } from "react";

import { IAppointment } from "src/@types";
import {
  setAppointmentRangeQuery,
  toggleAddNewAppointmentModal,
} from "src/store";
import { useAppDispatch } from "src/store/hooks";

import {
  appointmentMapping,
  dateToShowDetailsArray,
  getCurrentMonth,
} from "../shared/data-transform";
import { DataCell } from "./DataCell/DataCell";
import { DataCellTotal } from "./DataCell/DataCellTotal";
import { HeaderCalendar } from "./HeaderCalendar";

const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);

export interface IEventsCalendar {
  data: any;
  isLoading: boolean;
  appointmentsList: IAppointment[];
  rangeQuery: string;
}

export const EventsCalendar = ({
  data,
  isLoading,
  appointmentsList,
}: IEventsCalendar): JSX.Element => {
  const [rangeQuery, setRangeQuery] = useState(dayjs().format("YYYY-MM-DD"));
  const dispatch = useAppDispatch();

  const handleChange = (event: Dayjs) => {
    setRangeQuery(event.format());
  };
  useEffect(() => {
    dispatch(setAppointmentRangeQuery(rangeQuery));
  }, [rangeQuery]);

  const handleAddNewAppointment = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch(
      toggleAddNewAppointmentModal({
        open: true,
        date: dayjs().format(),
      })
    );
  };

  if (isLoading && rangeQuery === getCurrentMonth() && !data) {
    return <Spin />;
  }
  return (
    <>
      <Calendar
        onChange={handleChange}
        className="bookable24"
        dateFullCellRender={(value) => {
          const appointments = appointmentMapping(appointmentsList, value);
          const isDateToShowAppointments =
            value &&
            appointmentsList.length > 0 &&
            !dateToShowDetailsArray.includes(value?.format("YYYY-MM-DD"));

          return (
            <div
              className="ant-picker-cell-inner ant-picker-calendar-date"
              onClick={handleAddNewAppointment}
            >
              <div className="ant-picker-calendar-date-value">
                {value.date()}
              </div>
              <div className="ant-picker-calendar-date-content">
                {isDateToShowAppointments ? (
                  <DataCellTotal appointments={appointments} />
                ) : (
                  <DataCell
                    appointments={appointments}
                    rangeQuery={rangeQuery}
                  />
                )}
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
            totalAppointments={appointmentsList?.length}
          />
        )}
        onSelect={handleChange}
      />
    </>
  );
};

export const MemoEventsCalendar = React.memo(EventsCalendar);
