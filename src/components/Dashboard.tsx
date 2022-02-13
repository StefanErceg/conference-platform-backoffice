import React, { useState } from "react";
import { Dropdown } from "./general/Dropdown";
import { Loader } from "./general/Loader";
import { Modal } from "./general/Modal";
import { Header } from "./layout/Header";

export const Dashboard = () => {
  const [loaded, setLoaded] = useState(false);

  setTimeout(() => {
    setLoaded(true);
  }, 200);
  return (
    <div>
      <Header title={"aaa"} leftTool={<Dropdown />} />
      <Loader loaded={loaded}>
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
            <tr>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
        {/* <Modal /> */}
      </Loader>
    </div>
  );
};
