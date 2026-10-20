import { useRouter } from "next/router";
import { useMemo, useState } from "react";

import { initialValues, measurements } from "../../constants/unitCalculator";

type FormValues = typeof initialValues;
type Measurement = (typeof measurements)[number];

type FormState = {
  queryKey: string | null;
  values: FormValues;
  currentUnits: Measurement["units"];
};

function getQueryValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function useUnitCalculatorFormControls() {
  const router = useRouter();
  const { query, isReady, asPath } = router;

  const isQuery = asPath.includes("?");
  const queryOptions = ["type", "t", "num", "n", "unit", "u"];

  const validQuery = Object.keys(query).every((key) => queryOptions.includes(key));

  const typeQuery = (getQueryValue(query.type) ?? getQueryValue(query.t))?.toLowerCase();
  const numQuery = getQueryValue(query.num) ?? getQueryValue(query.n);
  const unitQuery = (getQueryValue(query.unit) ?? getQueryValue(query.u))?.toLowerCase();

  const queryKey = isReady ? JSON.stringify(query) : null;

  const queryResult = useMemo(() => {
    if (!typeQuery) return null;

    const level = measurements.find(
      (item) => item.type.startsWith(typeQuery) || Number.parseInt(typeQuery, 10) === item.id,
    );

    const levelType = level?.type;
    const levelUnits = level?.units;

    let unitTemp: string | undefined;

    if (levelType && unitQuery) {
      unitTemp = levelUnits
        .find(
          (item) =>
            item.label.toLowerCase().startsWith(unitQuery) || item.short === unitQuery || String(item.id) === unitQuery,
        )
        ?.unit.toString();

      if (levelType === "length" && unitQuery === "m") {
        unitTemp = "meters";
      } else if (levelType === "length" && (unitQuery === "mi" || unitQuery === "mil")) {
        unitTemp = "miles";
      }
    }

    return {
      values: {
        measurement: levelType ?? initialValues.measurement,
        numInput: numQuery != null && !Number.isNaN(Number.parseInt(String(numQuery), 10)) ? numQuery : "",
        unitSelection: unitTemp ?? levelUnits?.[0].unit ?? initialValues.unitSelection,
      },
      currentUnits: levelUnits,
    };
  }, [typeQuery, numQuery, unitQuery]);

  const [formState, setFormState] = useState<FormState>({
    queryKey: null,
    values: initialValues,
    currentUnits: measurements[0].units,
  });

  if (queryKey !== null && formState.queryKey !== queryKey) {
    setFormState((previous) => ({
      queryKey,
      values: queryResult?.values ?? previous.values,
      currentUnits: queryResult?.currentUnits ?? previous.currentUnits,
    }));
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormState((previous) => {
      if (name === "measurement") {
        const newOptions = measurements.filter((item) => item.type === value).flatMap((item) => item.units);

        return {
          ...previous,
          values: {
            measurement: value,
            numInput: "",
            unitSelection: newOptions[0]?.unit ?? initialValues.unitSelection,
          },
          currentUnits: newOptions,
        };
      }

      return {
        ...previous,
        values: {
          ...previous.values,
          [name]: value,
        },
      };
    });
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  const isLoading = !isReady || (isQuery && validQuery && !typeQuery);

  return {
    isLoading,
    values: formState.values,
    currentUnits: formState.currentUnits,
    handleChange,
    handleFocus,
  };
}
