"use client";
import {
  ExternalLink,
  Link2,
  Pencil,
  PlayCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type SongResourceCardProps = {
  title: string;
  description: string;
  url?: string;
  emptyLabel: string;
  linkLabel: string;
  icon: React.ElementType;
  onSave: (url: string) => void;
  onRemove: () => void;
  embedUrl?: string | null;
};

export const videoResourceDefaults = {
  title: "Vídeo de referência",
  description: "Assista a uma performance ou aula para guiar seu estudo.",
  emptyLabel: "Nenhum vídeo adicionado ainda.",
  linkLabel: "Abrir vídeo",
  icon: PlayCircle,
};

export const tabResourceDefaults = {
  title: "Tablatura",
  description:
    "Guarde o link da cifra ou tab para consultar durante a prática.",
  emptyLabel: "Nenhuma tablatura adicionada ainda.",
  linkLabel: "Abrir tablatura",
  icon: ExternalLink,
};

export const SongResourceCard = ({
  title,
  description,
  url,
  emptyLabel,
  linkLabel,
  icon: Icon,
  onSave,
  onRemove,
  embedUrl,
}: SongResourceCardProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [draftUrl, setDraftUrl] = useState(url ?? "");

  function handleSave() {
    const trimmed = draftUrl.trim();
    if (!trimmed) return;

    onSave(trimmed);
    setIsAdding(false);
  }

  function handleRemove() {
    onRemove();
    setDraftUrl("");
    setIsAdding(false);
  }

  function handleStartEdit() {
    setDraftUrl(url ?? "");
    setIsAdding(true);
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="size-4 text-muted-foreground" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        {url && !isAdding ? (
          <>
            {embedUrl && (
              <div className="aspect-video overflow-hidden rounded-lg border bg-muted/30">
                <iframe
                  src={embedUrl}
                  title={title}
                  className="size-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <div className="mt-auto flex flex-wrap items-center gap-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                )}
              >
                <ExternalLink data-icon="inline-start" />
                {linkLabel}
              </a>
              <Button variant="ghost" size="sm" onClick={handleStartEdit}>
                <Pencil data-icon="inline-start" />
                Alterar
              </Button>
              <Button variant="ghost" size="sm" onClick={handleRemove}>
                <Trash2 data-icon="inline-start" />
                Remover
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col gap-4 rounded-lg border border-dashed bg-muted/20 p-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                <Link2 className="size-4" />
              </div>
              <p className="text-sm">{emptyLabel}</p>
            </div>

            <div className="space-y-2">
              <Input
                type="url"
                placeholder="https://..."
                value={draftUrl}
                onChange={(event) => setDraftUrl(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSave();
                }}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={!draftUrl.trim()}
                >
                  <Plus data-icon="inline-start" />
                  {url ? "Salvar" : "Adicionar"}
                </Button>
                {(url || isAdding) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsAdding(false);
                      setDraftUrl(url ?? "");
                    }}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
