import React from "react";
import { Header } from "./layout/Header";

export const Dashboard = () => {
  return (
    <div>
      <Header title={"aaa"} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Start</th>
            <th>End</th>
            <th>Moderators</th>
          </tr>
        </thead>
        <tbody>
          <tr className="active">
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
          </tr>
          <tr>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
          </tr>
          <tr>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
          </tr>
          <tr>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
