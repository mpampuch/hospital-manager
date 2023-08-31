import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import {
  eachDayOfInterval,
  format,
  isSameDay,
  subDays,
  addDays,
} from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ appointments, numDays }) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalCosts: appointments
        .filter((appointment) =>
          isSameDay(date, new Date(appointment.created_at))
        )
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      Incomes: appointments
        .filter((appointment) => {
          const min = 1;
          const max = 1;
          // Generate a random number between min and max (inclusive)
          const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
          const followingDays = addDays(
            new Date(appointment.created_at),
            randomNum
          );
          return isSameDay(date, new Date(followingDays));
        })
        .reduce((acc, cur) => acc + (cur.isPaid ? cur.totalPrice : 0), 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalCosts: { stroke: "#b91c1c", fill: "#b91c1c" },
        Incomes: { stroke: "#22c55e", fill: "#22c55e" },

        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalCosts: { stroke: "#ff4444", fill: "#ffe8e8" },
        Incomes: { stroke: "#16a34a", fill: "#dcfce7" },

        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Cash flows from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}{" "}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalCosts"
            type="monotone"
            stroke={colors.totalCosts.stroke}
            fill={colors.totalCosts.fill}
            fillOpacity={0.5}
            strokeWidth={2}
            name="Operating costs"
            unit="$"
          />
          <Area
            dataKey="Incomes"
            type="monotone"
            stroke={colors.Incomes.stroke}
            fill={colors.Incomes.fill}
            fillOpacity={0.5}
            strokeWidth={2}
            name="Income"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
