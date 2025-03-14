"use client";
import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { format, startOfMonth, endOfMonth, eachWeekOfInterval, endOfWeek } from "date-fns";
import { es } from "date-fns/locale";
import { TZDate } from "@date-fns/tz";
import { TIME_ZONE } from "@/model/Definitions";
import { coordinatesParsers } from "@/modules/searchParams";
import { useQueryStates } from "nuqs";

/** Estructura de una semana */
interface WeekRange {
  weekNumber: number
  start: Date;
  end: Date;
}

/**
 * Genera un array de semanas dentro de un mes.
 * Usa lunes como inicio de semana (ISO 8601).
 */
function getWeeksOfMonth(year: number, month: number, locale = es): WeekRange[] {
  const firstDay = startOfMonth(new TZDate(year, month - 1, TIME_ZONE));
  const lastDay = endOfMonth(firstDay);

  // Encuentra el inicio de cada semana dentro del mes
  const weekStarts = eachWeekOfInterval(
    { start: firstDay, end: lastDay },
    { weekStartsOn: 1 } // 1 = lunes
  );

  return weekStarts.map((weekStart, index) => {
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
    return {
      weekNumber: index + 1,
      start: weekStart < firstDay ? firstDay : weekStart,
      end: weekEnd > lastDay ? lastDay : weekEnd,
    };
  });
}

/** Formatea una fecha como "24 feb" */
function formatDate(date: Date, locale = es) {
  return format(date, "d MMM", { locale });
}

export default function WeekSelector() {
  const [{ from, to, year, month }, setCoordinates] = useQueryStates(coordinatesParsers, {
    history: "replace",
    shallow: false,
  });
  //http://localhost:3000/measurement/macro?from=10-03-2025&to=16-03-2025
  const weeks = getWeeksOfMonth(year, month);
  const [selectedWeek, setSelectedWeek] = useState<WeekRange | null>(null);

  // Manejador que recibe el valor (weekNumber) seleccionado en el Select
  const handleSelectWeek = (weekNumber: string | string[]) => {

    // Si se selecciona una sola opción, weekNumber será un string
    if (weekNumber === "") {
      setCoordinates({ from: null, to: null });
      return;
    }

    
    const selectedKey = Array.isArray(weekNumber) ? weekNumber[0] : weekNumber;
    const week = weeks.find((w) => w.weekNumber === Number(selectedKey));
    if (week) {
      setSelectedWeek(week);
      setCoordinates({ from: week.start.toLocaleDateString('es-EC'), to: week.end.toLocaleDateString('es-EC') });
    }
  };

  return (
    <div className="w-full sm:w-80 min-w-[200px]">
      <Select
        placeholder="Seleccione un rango de fechas"
        onChange={(e) => handleSelectWeek(e.target.value)}
        //selectedKeys={selectedWeek ? [selectedWeek.weekNumber.toString()] : undefined}
      >
        {weeks.map((option) => (
          <SelectItem key={option.weekNumber} value={option.weekNumber.toString()}>
            {`${formatDate(option.start)} - ${formatDate(option.end)}`}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
