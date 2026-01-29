"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSignMessage } from "wagmi";
import { generateSignMessage } from "@/lib/wallet-auth";
import { Check, X, Loader2, Pencil, Lock } from "lucide-react";

interface UsernameEditorProps {
  address: string;
  currentDisplayName: string | null;
  usernameChangeCount: number;
  onSuccess?: (newName: string) => void;
}

export function UsernameEditor({
  address,
  currentDisplayName,
  usernameChangeCount,
  onSuccess,
}: UsernameEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(currentDisplayName || "");
  const [isLoading, setIsLoading] = useState(false);
  const { signMessageAsync } = useSignMessage();

  const remainingChanges = 3 - usernameChangeCount;
  const canEdit = remainingChanges > 0;

  const handleEdit = () => {
    if (!canEdit) {
      toast.error("Username change limit reached (maximum 3 times)");
      return;
    }
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDisplayName(currentDisplayName || "");
  };

  const handleSave = async () => {
    if (!displayName.trim()) {
      toast.error("Username cannot be empty");
      return;
    }

    if (displayName === currentDisplayName) {
      setIsEditing(false); // If unchanged, just exit edit mode, no error
      return;
    }

    setIsLoading(true);

    try {
      const signMessage = generateSignMessage(address);
      const signature = await signMessageAsync({ message: signMessage });

      const response = await fetch("/api/user/update-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          displayName: displayName.trim(),
          signature,
          signMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error?.message || data.error || "Failed to update username");
      }

      toast.success(`Username updated! ${data.data.remainingChanges} changes remaining.`);
      setIsEditing(false);
      onSuccess?.(displayName.trim());
    } catch (error: any) {
      console.error("Error updating username:", error);
      toast.error(error.message || "Failed to update username");
    } finally {
      setIsLoading(false);
    }
  };

  // Render View Mode
  if (!isEditing) {
    return (
      <div className="group flex items-center gap-2 h-9"> {/* Fixed height to prevent layout shift */}
        <span className="text-sm font-semibold text-black sm:text-base">
          {currentDisplayName || "Username"}
        </span>

        {canEdit ? (
          <button
            onClick={handleEdit}
            className="text-gray-500 hover:text-blue-500 transition-all opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-gray-100"
            title={`${remainingChanges} changes remaining`}
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        ) : (
          <span className="text-gray-400 opacity-0 group-hover:opacity-100" title="Maximum changes reached">
            <Lock className="w-3.5 h-3.5" />
          </span>
        )}
      </div>
    );
  }

  // Render Edit Mode - Improved
  return (
    <div className="flex flex-col w-full max-w-[320px]"> {/* Limit max width */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            maxLength={50}
            placeholder="Enter username"
            autoFocus // Better UX
            disabled={isLoading}
            className="w-full h-9 px-3 text-sm border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#35E7FF]/30 focus:border-[#35E7FF] border-gray-300 transition-all"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
          />
        </div>

        {/* Confirm Button - Blue Theme */}
        <Button
          onClick={handleSave}
          disabled={isLoading}
          size="sm"
          className="h-9 w-9 p-0 shrink-0 bg-[#35E7FF] text-[#282828] hover:bg-[#35E7FF]/80 transition-all"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Check className="w-5 h-5 stroke-[2.5]" />
          )}
        </Button>

        {/* Cancel Button */}
        <Button
          onClick={handleCancel}
          disabled={isLoading}
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 shrink-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </Button>
      </div>

      {/* Bottom Info, very lightweight */}
      <div className="flex justify-between items-center px-1 mt-1">
        <span className={`text-[10px] ${displayName.length > 45 ? 'text-amber-500' : 'text-gray-500'}`}>
          {displayName.length}/50
        </span>
        <span className="text-[10px] text-gray-500">
          {remainingChanges} changes left
        </span>
      </div>
    </div>
  );
}
