import React, { useState } from "react";
import TableRow from "./TableRow";
import initialData from "../data/initialData";

const HierarchicalTable = () => {
  const [data, setData] = useState(initialData);

  const updateValue = (id, newValue, type) => {
    const updatedData = data.map((row) => updateRow(row, id, newValue, type));
    setData(updatedData);
  };

  const updateRow = (row, id, newValue, type) => {
    if (row.id === id) {
      const variance =
        ((newValue - row.originalValue) / row.originalValue) * 100;

      if (row.children) {
        const totalOriginalChildrenValue = row.children.reduce(
          (sum, child) => sum + child.value,
          0
        );

        const updatedChildren = row.children.map((child) => {
          const proportion = child.value / totalOriginalChildrenValue;
          const newChildValue = newValue * proportion;
          return {
            ...child,
            value: newChildValue,
            variance:
              ((newChildValue - child.originalValue) / child.originalValue) *
              100,
          };
        });

        return { ...row, value: newValue, variance, children: updatedChildren };
      }

      return { ...row, value: newValue, variance };
    }

    if (row.children) {
      const updatedChildren = row.children.map((child) =>
        updateRow(child, id, newValue, type)
      );

      const updatedTotal = updatedChildren.reduce(
        (sum, child) => sum + child.value,
        0
      );

      const parentVariance =
        ((updatedTotal - row.originalValue) / row.originalValue) * 100;

      return {
        ...row,
        children: updatedChildren,
        value: updatedTotal,
        variance: parentVariance,
      };
    }

    return row;
  };

  const grandTotal = data.reduce((sum, row) => sum + row.value, 0);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <TableRow key={row.id} row={row} updateValue={updateValue} />
          ))}
          <tr className="grand-total">
            <td>Grand Total</td>
            <td>{grandTotal.toFixed(2)}</td>
            <td colSpan="4"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HierarchicalTable;
