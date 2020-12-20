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

  const [serumNa, setSerumNa] = React.useState(0.0);
  const [replacementNa, setReplacementNa] = React.useState(0.0);
  const [replacementVol, setReplacementVol] = React.useState(0.0);

  const toggleGender = () => setGender(!maleGender);

  const genderFactor = maleGender ? 0.6 : 0.5;
  const tbw = genderFactor * weight;

  // const newNa =
  //   (serumNa * tbw + replacementNa * replacementVol) / (tbw + replacementVol);

  const newNa = (replacementVol*serumNa - replacementVol*replacementNa)/tbw;

  return (
    <div className={card}>
      <p className={title}>Dysnatremia in CRRT</p>
      <p className={subtitle}>Change of serum sodium after 1 hour of CRRT</p>
      <Input label="Replacement Volume (L/hour)" onChange={setReplacementVol} />
      <Input label="Initial Na (mEq/L)" onChange={setSerumNa} />
      <Input label="Desired Na (mEq/L)" onChange={setReplacementNa} />
      <Input label="Weight (kg)" onChange={setWeight} />

      <div className={row}>
        <label className={colLabel}>Male Gender</label>
        <div className={colInput}>
          <Switch isOn={maleGender} toggle={toggleGender} />
        </div>
      </div>
      <div className={title}>
        <Show label="Total Body Water (kg)" value={round(tbw)} />
        <Show
          label="&#916; sodium in one hour (mEq/L)"
          value={round(newNa, 3)}
        />
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
