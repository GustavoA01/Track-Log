import { render, screen } from "@testing-library/react";
import { RouteStatusPage } from "@/components/RouteStatusPage";

describe("RouteStatusPage", () => {
  it("renders title, description and primary link", () => {
    render(
      <RouteStatusPage
        code="404"
        title="Página não encontrada"
        description="Esse caminho não existe."
      />,
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Página não encontrada")).toBeInTheDocument();
    expect(screen.getByText("Esse caminho não existe.")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Voltar ao início" }),
    ).toHaveAttribute("href", "/");
    expect(screen.queryByText("Tentar novamente")).not.toBeInTheDocument();
  });

  it("renders reset button if reset is passed as prop", () => {
    render(
      <RouteStatusPage
        code="404"
        title="Página não encontrada"
        description="Esse caminho não existe."
        reset={jest.fn()}
      />,
    );

    expect(screen.getByText("Tentar novamente")).toBeInTheDocument();
  });

  it("Calls reset if it is passed as prop", () => {
    const mockReset = jest.fn();
    const { getByText } = render(
      <RouteStatusPage
        code="404"
        title="Página não encontrada"
        description="Esse caminho não existe."
        reset={mockReset}
      />,
    );

    const component = getByText("Tentar novamente");
    component.click();
    expect(mockReset).toHaveBeenCalled();
  });
});
