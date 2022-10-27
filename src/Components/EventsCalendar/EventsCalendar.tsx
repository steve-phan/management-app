import { BadgeProps, Empty, Spin } from "antd";
import { Badge, Calendar } from "antd";
import axios from "axios";
import type { Moment } from "moment";
import { useQuery } from "react-query";
import { IAppointment } from "src/@types";
import { appointmentMapping, getCurrentMonth } from "../shared/custom-dayjs";

const getMonthData = (value: Moment) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export const EventsCalendar = (): JSX.Element => {
  const { data, isLoading } = useQuery(["checkAuth"], async () => {
    return await axios.get("/.netlify/functions/get-all-appointments", {
      headers: {
        shopId: "gao-vegan0410940",
        appointmentOfMonth: getCurrentMonth(),
      },
    });
  });

  const dayObj = appointmentMapping(data?.data?.appointments);
  // console.log({ dayObj });
  const monthCellRender = (value: Moment) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  if (isLoading) {
    return <Spin />;
  }

  const dateCellRender = (value: Moment) => {
    const date = value.date();
    const listAppointments = dayObj[date] as IAppointment[];
    console.log({ listAppointments });

    if (listAppointments.length > 3) {
      return (
        <>
          <ul className="events">
            {listAppointments.slice(0, 2).map((item) => (
              <li key={item._id}>
                {/* <Badge
                status={item.type as BadgeProps["status"]}
                text={item.content}
              /> */}
                {item.firstName + item.lastName}
              </li>
            ))}
            <li className="viewmore" key={listAppointments[3]._id}>
              <Badge
                status="warning"
                text={` View more ${listAppointments.length - 2}`}
              />
            </li>
          </ul>
        </>
      );
    }

    return (
      <ul className="events">
        {listAppointments.map((item) => (
          <li key={item._id}>
            {/* <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            /> */}
            {item.firstName + item.lastName}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Calendar
      className="bookable24"
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  );
};
