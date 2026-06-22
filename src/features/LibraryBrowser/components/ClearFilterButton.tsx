type ClearFilterButtonProps = {
  selectedFolderId: string | null;
  setSelectedFolderId: (folderId: string | null) => void;
};

export const ClearFilterButton = ({
  selectedFolderId,
  setSelectedFolderId,
}: ClearFilterButtonProps) => (
  <div className="flex items-center justify-between">
    <h2 className="text-sm font-medium">Pastas</h2>
    {selectedFolderId && (
      <button
        type="button"
        onClick={() => setSelectedFolderId(null)}
        className="text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        Limpar filtro
      </button>
    )}
  </div>
);
