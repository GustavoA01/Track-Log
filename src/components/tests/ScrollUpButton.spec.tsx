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
