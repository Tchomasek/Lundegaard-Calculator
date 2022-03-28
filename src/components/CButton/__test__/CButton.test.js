import { CButton } from "../index";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CButton />, div);
});

it("renders button correctly", () => {
  const { getByTestId } = render(<CButton info={"Click"} />);
  expect(getByTestId("CButton")).toHaveTextContent("Click");
});

it("renders button correctly", () => {
  const { getByTestId } = render(<CButton info={"Save"} />);
  expect(getByTestId("CButton")).toHaveTextContent("Save");
});

it("matches snapshot", () => {
  const button = renderer.create(<CButton info={"Click"} />).toJSON();
  expect(button).toMatchSnapshot();
});
