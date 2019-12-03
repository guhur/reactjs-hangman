import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Hangman from "./Hangman";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with fake words", async () => {
  const fakeGitHub = {
    files: {
        "words.txt": {
            content: "banana\nwhisky"
        },
        "results.txt": {
            content: `{
                "guessed":["f","e"],
                "mistake":1
            }`
            } 
        }
    };

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeGitHub)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Hangman />, container);
  });

  expect(container.querySelector("[data-testid=wrong]").textContent).toBe("1");

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
 
