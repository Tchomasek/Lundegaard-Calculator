import { CInput } from "../index";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <CInput
      info={""}
      onSubmit={() => {}}
      value={0}
      min_value={0}
      max_value={1}
      onChangeSlider={() => {}}
      marks={[]}
      error={false}
      helperText={""}
      displayedValue={0}
      onChangeTextInput={() => {}}
      onBlur={() => {}}
      unit={""}
    />,
    div
  );
});

it("renders button correctly", () => {
  const { getByTestId } = render(
    <CInput
      info={"Info"}
      onSubmit={() => {}}
      value={0}
      min_value={0}
      max_value={1}
      onChangeSlider={() => {}}
      marks={[]}
      error={false}
      helperText={""}
      displayedValue={0}
      onChangeTextInput={() => {}}
      onBlur={() => {}}
      unit={""}
    />
  );
  expect(getByTestId("CInput")).toHaveTextContent("Info");
});

it("matches snapshot", () => {
  const button = renderer.create(<CInput info={"Click"} />).toJSON();
  expect(button).toMatchSnapshot();
});
