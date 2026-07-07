import { render, screen } from "@testing-library/react";
import { SongFormLayout } from "../components/SongFormLayout";

describe("SongFormLayout", () => {
  it("renders title, description and children", () => {
    render(
      <SongFormLayout
        title="Nova música"
        description="Cadastre uma nova música"
        backHref="/biblioteca"
      >
        <p>Formulário</p>
      </SongFormLayout>,
    );

    expect(
      screen.getByRole("heading", { name: "Nova música" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Cadastre uma nova música")).toBeInTheDocument();
    expect(screen.getByText("Formulário")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /voltar/i })).toBeInTheDocument();
  });
});
