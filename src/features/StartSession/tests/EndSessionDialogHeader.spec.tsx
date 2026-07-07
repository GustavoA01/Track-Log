import { render, screen } from "@testing-library/react";
import { Dialog } from "@/components/ui/dialog";
import { EndSessionDialogHeader } from "../components/EndSessionDialogHeader";

describe("EndSessionDialogHeader", () => {
  it("renders song info with plural minutes", () => {
    render(
      <Dialog open>
        <EndSessionDialogHeader
          songTitle="Wonderwall"
          songArtist="Oasis"
          minutes={30}
        />
      </Dialog>,
    );

    expect(screen.getByText("Encerrar sessão")).toBeInTheDocument();
    expect(
      screen.getByText("Wonderwall · Oasis · 30 minutos praticados"),
    ).toBeInTheDocument();
  });

  it("uses singular minute label", () => {
    render(
      <Dialog open>
        <EndSessionDialogHeader
          songTitle="Wonderwall"
          songArtist="Oasis"
          minutes={1}
        />
      </Dialog>,
    );

    expect(
      screen.getByText("Wonderwall · Oasis · 1 minuto praticado"),
    ).toBeInTheDocument();
  });
});
