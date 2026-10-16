"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface BaseFieldProps {
  label: string;
  name?: string;
  description?: string;
  required?: boolean;
}

interface TextFieldProps extends BaseFieldProps {
  type?: "text" | "email" | "url" | "number";
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextField({
  label,
  name,
  type = "text",
  value,
  defaultValue,
  placeholder,
  required,
  description,
  onChange,
}: TextFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="font-mono text-xs font-bold uppercase tracking-wider text-ink"
        >
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      </div>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        className="w-full border-2 border-line bg-card px-3 py-2 font-mono text-sm text-ink outline-none transition-colors focus:bg-white"
      />
      {description && (
        <p className="font-mono text-[11px] text-muted">{description}</p>
      )}
    </div>
  );
}

interface TextareaProps extends BaseFieldProps {
  rows?: number;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextareaField({
  label,
  name,
  rows = 4,
  value,
  defaultValue,
  placeholder,
  required,
  description,
  onChange,
}: TextareaProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="font-mono text-xs font-bold uppercase tracking-wider text-ink"
      >
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        className="w-full border-2 border-line bg-card p-3 font-mono text-sm text-ink outline-none transition-colors focus:bg-white"
      />
      {description && (
        <p className="font-mono text-[11px] text-muted">{description}</p>
      )}
    </div>
  );
}

interface ArrayFieldProps {
  label: string;
  name: string;
  initialValues?: readonly string[];
  placeholder?: string;
  description?: string;
}

export function ArrayField({
  label,
  name,
  initialValues = [],
  placeholder = "Enter item...",
  description,
}: ArrayFieldProps) {
  const [items, setItems] = useState<string[]>(
    initialValues.length > 0 ? [...initialValues] : [""]
  );

  const addItem = () => setItems([...items, ""]);
  const removeItem = (idx: number) => {
    if (items.length <= 1) {
      setItems([""]);
      return;
    }
    setItems(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx: number, val: string) => {
    const updated = [...items];
    updated[idx] = val;
    setItems(updated);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
          {label}
        </label>
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-1 border border-line bg-neo-yellow px-2 py-0.5 font-mono text-[10px] font-bold text-ink shadow-hard-sm hover:scale-105"
        >
          <Plus className="h-3 w-3" />
          <span>ADD ROW</span>
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              name={`${name}[]`}
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 border-2 border-line bg-card px-3 py-2 font-mono text-sm text-ink outline-none focus:bg-white"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-line bg-neo-red/10 text-destructive hover:bg-neo-red hover:text-white"
              title="Delete row"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      {description && (
        <p className="font-mono text-[11px] text-muted">{description}</p>
      )}
    </div>
  );
}
