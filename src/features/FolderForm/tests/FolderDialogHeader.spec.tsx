import { render, screen } from "@testing-library/react";
import { Dialog } from "@/components/ui/dialog";
import { FolderDialogHeader } from "../components/FolderDialogHeader";

const renderHeader = (isEditing = false) =>
  render(
    <Dialog open>
      <FolderDialogHeader isEditing={isEditing} />
    </Dialog>,
  );

describe("FolderDialogHeader", () => {
  it("renders create mode title and description", () => {
    renderHeader(false);

    expect(screen.getByText("Nova pasta")).toBeInTheDocument();
    expect(
      screen.getByText("Organize suas músicas em uma pasta personalizada."),
    ).toBeInTheDocument();
  });

  it("renders edit mode title and description", () => {
    renderHeader(true);

    expect(screen.getByText("Editar pasta")).toBeInTheDocument();
    expect(
      screen.getByText("Atualize o nome ou a imagem da pasta."),
    ).toBeInTheDocument();
  });
});
