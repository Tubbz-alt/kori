import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import * as React from "react";

export default function TruthTable({ table, variables = []}) {
  var n = 2;
  if (table && table.length && table[0]) {
    n = table[0].length
  }
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell />
          {
            Array
              .from(Array(n - 2).keys())
              .map(v => (
                <TableCell key={v}>{variables[v] || String.fromCharCode('A'.charCodeAt(0) + v)}</TableCell>
              ))
          }
          <TableCell>f</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {
          table
            .map((row, i) => (
              <TableRow key={i}>
                {
                  row
                    .map((v, i) => (
                      <TableCell key={i}>{`${i === 0 ? 'm' : ''}${v}`}</TableCell>
                    ))
                }
              </TableRow>
            ))
        }
      </TableBody>
    </Table>
  );
}
