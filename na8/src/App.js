import React from "react";
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
  const [dialVol, setDialVol] = React.useState(0.0);
  const [dialNa, setDialNa] = React.useState(0.0);
  const [preVol, setPreVol] = React.useState(0.0);
  const [preNa, setPreNa] = React.useState(0.0);
  const [postVol, setPostVol] = React.useState(0.0);
  const [postNa, setPostNa] = React.useState(0.0);
  const [citVol, setCitVol] = React.useState(0.0);
  const [citNa, setCitNa] = React.useState(0.0);
  const [ivfVol, setIvfVol] = React.useState(0.0);
  const [ivfNa, setIvfNa] = React.useState(0.0);

  const [desiredlNa, setDesiredNa] = React.useState(0.0);

  const totalVolume = dialVol + preVol + postVol + citVol + ivfVol;

  const sodiumInfused =
    dialVol * dialNa +
    preVol * preNa +
    postVol * postNa +
    citVol * citNa +
    ivfVol * ivfNa;
  const sodiumGoal = desiredlNa * totalVolume;

  const sodiumDeficit = sodiumGoal - sodiumInfused;

  const hypertonic = sodiumDeficit / (513-desiredlNa);

  return (
    <div className={card}>
      <p className={title}>Hypernatremia in CRRT</p>
      <p className={subtitle}>
        Volume of 3% saline needed to slow down the rate of serum sodium decline in
        CVVHDF
      </p>
      <Input label="Dialysate Rate (L/h)" onChange={setDialVol} />
      <Input label="Dialysate Sodium (mEq/L)" onChange={setDialNa} />
      <Input label="Prefilter Replacement (L/h)" onChange={setPreVol} />
      <Input label="Prefilter Sodium (mEq/L)" onChange={setPreNa} />
      <Input label="Postfilter Replacement (L/h)" onChange={setPostVol} />
      <Input label="Postfilter Sodium (mEq/L)" onChange={setPostNa} />
      <Input label="Citrate Rate (L/h)" onChange={setCitVol} />
      <Input label="Citrate Sodium Content(mEq/L)" onChange={setCitNa} />
      <Input label="Other Infused Fluid (L/h)" onChange={setIvfVol} />
      <Input label="Na in Other infused Fluid(mEq/L)" onChange={setIvfNa} />
      <Input label="Desired Na (mEq/L)" onChange={setDesiredNa} />

      <div className={title}>
        <Show
          label="3% saline to give post-filter (mL/h)"
          value={round(hypertonic * 1000)}
        />
      </div>
      <ul className="list-none text-sm italic">
        <li>&bull; Infusion will increase the dose of CVVHDF.</li>
        <li>
          &bull; Check serum Na every 1-2 h, once desired Na is achieved the
          same formula is used to calculate the next Na target.
        </li>
      </ul>
      <br />
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
