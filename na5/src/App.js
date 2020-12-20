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
  const [preVol, setPreVol] = React.useState(0.0);
  const [preNa, setPreNa] = React.useState(0.0);
  const [desiredlNa, setDesiredNa] = React.useState(0.0);

  const sodiumExcess = preNa * preVol - desiredlNa * preVol;

  const d5w = sodiumExcess / desiredlNa;

  return (
    <div className={card}>
      <p className={title}>Hyponatremia in CRRT</p>
      <p className={subtitle}>
        Volume of D5W needed to slow down the rate of serum sodium rise in CVVH
      </p>
      <Input label="Prefilter Replacement Rate (L/h)" onChange={setPreVol} />
      <Input label="Prefilter Sodium (mEq/L)" onChange={setPreNa} />

      <Input label="Desired Na (mEq/L)" onChange={setDesiredNa} />

      <div className={title}>
        <Show
          label="D5W to give post-filter (mL/h)"
          value={round(d5w * 1000)}
        />
      </div>
      <ul className="list-none text-sm italic">
        <li>&bull; D5W infusion will increase the dose of CVVH.</li>
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
