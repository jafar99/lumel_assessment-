import React, { useState } from "react";

const TableRow = ({ row, updateValue, level = 0 }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <tr>
        <td style={{ paddingLeft: `${level * 20}px` }}>{row.label}</td>
        <td>{row.value.toFixed(2)}</td>
        <td>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </td>
        <td>
          <button
            onClick={() =>
              updateValue(row.id, row.value * (1 + inputValue / 100), "%")
            }
          >
            Apply %
          </button>
        </td>
        <td>
          <button
            onClick={() => updateValue(row.id, Number(inputValue), "val")}
          >
            Apply Value
          </button>
        </td>
        <td>{row.variance ? row.variance.toFixed(2) + "%" : "-"}</td>
      </tr>

      {row.children &&
        row.children.map((child) => (
          <TableRow
            key={child.id}
            row={child}
            updateValue={updateValue}
            level={level + 1}
          />
        ))}
    </>
  );
};

export default TableRow;
