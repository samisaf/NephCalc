import React from "react";
import Switch from "./Components/Switch";
import Input from "./Components/Input";
import Show from "./Components/Show";

const card = "max-w-sm rounded shadow-lg bg-gray-300 p-2 m-2";
const title = "font-bold";
const subtitle = "underline";
const row = "flex m-2";
const colLabel = "w-2/3";
const colInput = "w-1/3 text-center";
const link = "text-xs text-blue-700";
const round = (n, d = 0) => Math.round(n * 10 ** d) / 10 ** d;

export default function() {
  const [weight, setWeight] = React.useState(0.0);
  const [maleGender, setGender] = React.useState(false);
  const [initialNa, setInitialNa] = React.useState(0.0);
  const [dialysateNa, setDialysateNa] = React.useState(0.0);
  const [riNa, setRiNa] = React.useState(0.0);
  const [time, setTime] = React.useState(0.0);

  const toggleGender = () => setGender(!maleGender);

  const genderFactor = maleGender ? 0.6 : 0.5;
  const tbw = genderFactor * weight;

  const qb = (riNa * tbw) / ((dialysateNa - initialNa) * time);

  return (
    <div className={card}>
      <p className={title}>Hyponatremia in Hemodialysis Patients</p>
      <p className={subtitle}>
        Blood flow rate needed for a slow rise in serum sodium
      </p>
      <Input label="Initial Na (mEq/L)" onChange={setInitialNa} />
      <Input label="Dialysate Na (mEq/L)" onChange={setDialysateNa} />
      <Input label="Desired Rise of Na (mEq/L)" onChange={setRiNa} />
      <Input label="Weight (kg)" onChange={setWeight} />
      <Input label="HD Session Time (min)" onChange={setTime} />

      <div className={row}>
        <label className={colLabel}>Male Gender</label>
        <div className={colInput}>
          <Switch isOn={maleGender} toggle={toggleGender} />
        </div>
      </div>
      <div className={title}>
        <Show label="Total Body Water (kg)" value={round(tbw)} />
        <Show label="Blood Flow Rate (mL/min)" value={round(qb * 1000)} />
      </div>
      <p className="text-center text-sm">
        Information presented here, including use of the calculator, is strictly
        for educational purposes and should not be used for any other purpose.
      </p>

      <p className="text-center">
        <a
          className={link}
          href="https://onlinelibrary.wiley.com/doi/abs/10.1111/sdi.12918"
        >
          Formulas by Mohammad Tinawi, MD & Bahar Bastani, MD
        </a>
      </p>
      <p className="text-center">
        <a className={link} href="https://iculearning.com">
          Programming by Sami Safadi, MD
        </a>
      </p>
    </div>
  );
}
