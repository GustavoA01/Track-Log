import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ScrollUpButton } from "@/components/ScrollUpButton";

const setScrollY = (value: number) => {
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    writable: true,
    value,
  });
};

const scrollTo = jest.fn();

describe("ScrollUpButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setScrollY(0);
    window.scrollTo = scrollTo;
  });

  it("starts hidden when the page is at the top", () => {
    render(<ScrollUpButton />);

    const button = screen.getByRole("button", { name: "Voltar ao topo" });
    expect(button).toHaveClass("opacity-0", "pointer-events-none", "scale-75");
  });

  it("becomes visible after scrolling past 600px", () => {
    render(<ScrollUpButton />);

    setScrollY(601);
    fireEvent.scroll(window);

    expect(screen.getByRole("button", { name: "Voltar ao topo" })).toHaveClass(
      "opacity-100",
      "scale-100",
    );
  });

  it("stays hidden at exactly 600px", () => {
    render(<ScrollUpButton />);

    setScrollY(600);
    fireEvent.scroll(window);

    expect(screen.getByRole("button", { name: "Voltar ao topo" })).toHaveClass(
      "opacity-0",
      "pointer-events-none",
    );
  });

  it("scrolls smoothly to the top when clicked", async () => {
    const user = userEvent.setup();
    setScrollY(601);

    render(<ScrollUpButton />);
    fireEvent.scroll(window);

    await user.click(screen.getByRole("button", { name: "Voltar ao topo" }));

    expect(scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("removes the scroll listener on unmount", () => {
    const removeEventListener = jest.spyOn(window, "removeEventListener");
    const { unmount } = render(<ScrollUpButton />);

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );
  });
});
