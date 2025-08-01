import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import routes from "../routes";

const id = 1;
const router = createMemoryRouter(routes, {
  initialEntries: [`/movie/${id}`],
  initialIndex: 0,
});

test("renders without any errors", () => {
  const errorSpy = vi.spyOn(global.console, "error");

  render(<RouterProvider router={router} />);

  expect(errorSpy).not.toHaveBeenCalled();

  errorSpy.mockRestore();
});

test("renders movie's title in an h1", async () => {
  render(<RouterProvider router={router} />);
  const h1 = await screen.findByText(/Doctor Strange/);
  expect(h1).toBeInTheDocument();
  expect(h1.tagName).toBe("H1");
});

test("renders movie's time within a p tag", async () => {
  render(<RouterProvider router={router} />);
  const p = await screen.findByText(/115/);
  expect(p).toBeInTheDocument();
  expect(p.tagName).toBe("P");
});

// THIS IS THE FIXED TEST
test("renders a span for each genre", async () => { // <--- ADD `async` here
  render(<RouterProvider router={router} />);
  const genres = ["Action", "Adventure", "Fantasy"];

  // Use a for...of loop to properly await each iteration
  for (const genre of genres) {
    const span = await screen.findByText(genre);
    expect(span).toBeInTheDocument();
    expect(span.tagName).toBe("SPAN");
  }
});

test("renders the <NavBar /> component", async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: [`/movie/1`],
  });
  render(<RouterProvider router={router} />);
  expect(await screen.findByRole("navigation")).toBeInTheDocument();
});