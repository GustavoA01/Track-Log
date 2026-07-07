import { render, screen } from "@testing-library/react";
import { Dialog } from "@/components/ui/dialog";
import { StartSessionDialogHeader } from "../components/StartSessionDialogHeader";

describe("StartSessionDialogHeader", () => {
  it("renders title and description", () => {
    render(
      <Dialog open>
        <StartSessionDialogHeader />
      </Dialog>,
    );

    expect(screen.getByText("Iniciar sessão")).toBeInTheDocument();
    expect(
      screen.getByText("Defina por quanto tempo você quer praticar"),
    ).toBeInTheDocument();
  });
});
