import { Spin } from "antd";
import { CalendarMode } from "antd/lib/calendar/generateCalendar";
import { Dayjs } from "dayjs";

import { Col, Radio, Row, Select, Typography } from "antd";

import { monthsShort } from "../shared/data-transform";

export interface IHeaderCalendarProps {
  value: Dayjs;
  type: CalendarMode;
  onChange: (date: Dayjs) => void;
  onTypeChange: (type: CalendarMode) => void;
  isLoading?: boolean;
  totalAppointments?: number;
}

export const HeaderCalendar = ({
  value,
  type,
  onChange,
  onTypeChange,
  isLoading,
  totalAppointments,
}: IHeaderCalendarProps) => {
  const monthOptions = [];
  const months = [];

  for (let i = 0; i < 12; i++) {
    months.push(monthsShort[i]);
  }

  for (let i = 0; i < 12; i++) {
    monthOptions.push(
      <Select.Option key={i} value={i} className="month-item">
        {months[i]}
      </Select.Option>
    );
  }

  const year = value.year();
  const month = value.month();
  const options = [];
  for (let i = year - 10; i < year + 10; i += 1) {
    options.push(
      <Select.Option key={i} value={i} className="year-item">
        {i}
      </Select.Option>
    );
  }
  return (
    <div
      style={{
        padding: 8,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Typography.Text>
          {`Total appointments: `}
          {isLoading ? (
            <Spin size="small" />
          ) : (
            <span
              style={{
                fontWeight: "bold",
                color: "#ff8000",
              }}
            >
              {totalAppointments}
            </span>
          )}
        </Typography.Text>
      </div>
      <Row gutter={8}>
        <Col>
          <Radio.Group
            size="middle"
            onChange={(e) => onTypeChange(e.target.value)}
            value={type}
          >
            <Radio.Button value="month">Month</Radio.Button>
            <Radio.Button value="year">Year</Radio.Button>
          </Radio.Group>
        </Col>
        <Col>
          <Select
            size="middle"
            dropdownMatchSelectWidth={false}
            className="my-year-select"
            value={year}
            onChange={(newYear) => {
              const now = value.clone().year(newYear);
              onChange(now);
            }}
          >
            {options}
          </Select>
        </Col>
        <Col>
          <Select
            size="middle"
            dropdownMatchSelectWidth={false}
            value={month}
            onChange={(newMonth) => {
              const now = value.clone().month(newMonth);
              onChange(now);
            }}
          >
            {monthOptions}
          </Select>
        </Col>
      </Row>
    </div>
  );
};
