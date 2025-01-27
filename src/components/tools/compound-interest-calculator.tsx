"use client";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { map } from "lodash-es";
import { useState } from "react";

export default function CompoundInterestCalculator({}) {
  const compoundedOnList = ["Yearly", "Quarterly", "Monthly"];

  const [principal, setPrincipal] = useState<number>(1000);
  const [interestRate, setInterestRate] = useState<number>(6);
  const [ternureInMonths, setTenureInMonths] = useState<number>(12);
  const [compoundedOn, setCompoundedOn] = useState<string>(compoundedOnList[1]);

  const compoundedOnValues = map(compoundedOnList, (item) => {
    return (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    );
  });

  const onPrincipalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrincipal(Number(event.target.value));
    const { amount, interest } = calculateCompoundInterest({
      principal: Number(event.target.value),
      interestRate,
      ternureInMonths,
      compoundedOn,
    });
    setCompoundedAmount(amount);
    setCompoundInterest(interest);
  };

  const onInterestRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(Number(event.target.value));
    const { amount, interest } = calculateCompoundInterest({
      principal,
      interestRate: Number(event.target.value),
      ternureInMonths,
      compoundedOn,
    });
    setCompoundedAmount(amount);
    setCompoundInterest(interest);
  };

  const onTenureInMonthsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTenureInMonths(Number(event.target.value));
    const { amount, interest } = calculateCompoundInterest({
      principal,
      interestRate,
      ternureInMonths: Number(event.target.value),
      compoundedOn,
    });
    setCompoundedAmount(amount);
    setCompoundInterest(interest);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCompoundedOn(event.target.value as string);
    const { amount, interest } = calculateCompoundInterest({
      principal,
      interestRate,
      ternureInMonths,
      compoundedOn: event.target.value as string,
    });
    setCompoundedAmount(amount);
    setCompoundInterest(interest);
  };

  const calculateCompoundInterest = ({
    principal,
    interestRate,
    ternureInMonths,
    compoundedOn,
  }: {
    principal: number;
    interestRate: number;
    ternureInMonths: number;
    compoundedOn: string;
  }) => {
    /**
     * convert tenure in years
     */
    const tenureInYears: number = Number(ternureInMonths) / 12;

    /**
     *
     * n is the number of times that interest is compounded per unit t,
     * for example if interest is compounded monthly and t is in years then the
     * value of n would be 12. If interest is compounded quarterly and t is in
     * years then the value of n would be 4.
     *
     */
    let n: number = 1;

    if (compoundedOn === "Quarterly") {
      n = 4;
    } else if (compoundedOn === "Monthly") {
      n = 12;
    }

    const amount: number =
      Number(principal) *
      Math.pow(1 + Number(interestRate) / (n * 100), n * tenureInYears);

    const interest = amount - Number(principal);

    return { amount, interest };
  };

  const { amount, interest } = calculateCompoundInterest({
    principal,
    interestRate,
    ternureInMonths,
    compoundedOn,
  });

  const [compoundedAmount, setCompoundedAmount] = useState<number>(amount);
  const [compoundInterest, setCompoundInterest] = useState<number>(interest);

  return (
    <div className="flex flex-col gap-3 mt-3">
      <div className="flex flex-col gap-3 w-full md:flex-row md:justify-center">
        <TextField
          label="Principal Amount"
          variant="outlined"
          required={true}
          value={principal}
          onChange={onPrincipalChange}
        />
        <TextField
          label="Interest Rate (%)"
          variant="outlined"
          required={true}
          value={interestRate}
          onChange={onInterestRateChange}
        />
        <TextField
          label="Tenure (In Months)"
          variant="outlined"
          required={true}
          value={ternureInMonths}
          onChange={onTenureInMonthsChange}
        />
        <div className="w-full md:w-[15rem]">
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Compounded On</InputLabel>
            <Select
              value={compoundedOn}
              label="Compounded On"
              onChange={handleChange}
            >
              {compoundedOnValues}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full items-center md:flex-row md:justify-center">
        <div className="flex flex-row gap-1">
          <Typography variant="body1" color="primary">
            Compounded Amount:
          </Typography>
          <Typography variant="body1">{compoundedAmount.toFixed(2)}</Typography>
        </div>
        <div className="flex flex-row gap-1">
          <Typography variant="body1" color="primary">
            Compound Interest:
          </Typography>
          <Typography variant="body1">{compoundInterest.toFixed(2)}</Typography>
        </div>
      </div>
    </div>
  );
}
