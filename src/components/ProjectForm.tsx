import React, { useState } from "react";

import type { ProjectInsert } from "../types/project";

interface Props {
  initial?: ProjectInsert
  onSubmit: (data: ProjectInsert, imageFile?: File) => Promise<void>
  onCancel: () => void
}

export default function ProjectForm({ initial, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [tags, setTags] = useState(initial?.tags?.join(', ') ?? '')
  const [liveUrl, setLiveUrl] = useState(initial?.live_url ?? '')
  const [repoUrl, setRepoUrl] = useState(initial?.repo_url ?? '')
  const [imageFile, setImageFile] = useState<File | undefined>()
  const [loading, setLoading] = useState(false)
  const [existingImageUrl, setExistingImageUrl] = useState(initial?.image_url ?? null);

  async function handleSubmit() {
    if (!name.trim()) return;
    setLoading(true);

    await onSubmit({
      name,
      description: description || null,
      tags: tags ? tags.split(",").map(tag => tag.trim()) : null,
      live_url: liveUrl || null,
      repo_url: repoUrl || null,
      image_url: existingImageUrl
    },
      imageFile
    )
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="nameInput" className="text-xs text-zinc-500">Nombre:</label>
        <input
          id="nameInput"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 bg-transparent outline-none focus:border-zinc-400 dark:focus:border-zinc-500"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="descriptionArea">Descripcion:</label>
        <textarea
          name="description"
          id="descriptionArea"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          className="text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 bg-transparent outline-none focus:border-zinc-400 dark:focus:border-zinc-500 resize-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="liveUrlInput" className="text-xs text-zinc-500">Url del sitio:</label>
        <input
          id="liveUrlInput"
          type="text"
          value={liveUrl}
          onChange={e => setLiveUrl(e.target.value)}
          className="text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 bg-transparent outline-none focus:border-zinc-400 dark:focus:border-zinc-500"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="repoUrlInput" className="text-xs text-zinc-500">Url del repositiorio:</label>
        <input
          id="repoUrlInput"
          type="text"
          value={repoUrl}
          onChange={e => setRepoUrl(e.target.value)}
          className="text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 bg-transparent outline-none focus:border-zinc-400 dark:focus:border-zinc-500"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-zinc-500" htmlFor="imageInput">Imagen:</label>
        <input
          type="file"
          name="imageInput"
          id="imageInput"
          accept="image/*"
          onChange={e => setImageFile(e.target.files?.[0])}
          className="text-sm text-zinc-600 dark:text-zinc-400"
        />
      </div>
      <div className="flex gap-2 mt-2">
        <button
          disabled={loading || !name.trim()}
          onClick={handleSubmit}
          className="text-sm px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-80 disabled:opacity-45 transition-opacity"
        >{loading ? "Guardando..." : "Guardar"}</button>
        <button
          onClick={onCancel}
          className="text-sm px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          Cancelar
        </button>
      </div>

    </div>
  )
}