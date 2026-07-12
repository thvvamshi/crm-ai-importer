"use client";

import { useState } from "react";
import { toast } from "sonner";

import { parseCSV } from "@/lib/csv";
import { uploadImport, processImport , getImportStatus } from "@/lib/imports";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import UploadCard from "@/components/home/UploadCard";
import EmptyLeads from "@/components/home/EmptyLeads";
import UploadModal from "@/components/upload/UploadModal";

export default function Home() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [previewRows, setPreviewRows] = useState<Record<string, string>[]>([]);

  const [isProcessing, setIsProcessing] = useState(false);

  const [importId, setImportId] = useState("");

  const [status, setStatus] = useState("");

  const [progress, setProgress] = useState(0);

  function handleOpenUpload() {
    setIsUploadOpen(true);
  }

  async function pollImport(importId: string) {
    const interval = setInterval(async () => {
      try {
        const response = await getImportStatus(importId);

        const data = response.data;

        setStatus(data.status);
        setProgress(data.progress ?? 0);

        if (data.status === "COMPLETED" || data.status === "FAILED") {
          clearInterval(interval);

          console.log("Processing finished.");

          // Next step:
          // Fetch imported leads
        }
      } catch (error) {
        console.error(error);

        clearInterval(interval);
      }
    }, 2000);
  }

  async function handleFileSelect(file: File) {
    setSelectedFile(file);

    try {
      const rows = await parseCSV(file);
      setPreviewRows(rows);
    } catch (error) {
      console.error(error);
      toast.error("Unable to preview the CSV file.");
    }
  }

  function handleRemoveFile() {
    if (isProcessing) return;

    setSelectedFile(null);
    setPreviewRows([]);
  }

  function resetUploadState() {
    setSelectedFile(null);
    setPreviewRows([]);
    setIsUploadOpen(false);
  }

  async function handleUpload() {
    if (!selectedFile || isProcessing) return;

    const loadingToast = toast.loading("Uploading CSV...");

    try {
      setIsProcessing(true);

      // Upload CSV
      const uploadResponse = await uploadImport(selectedFile);

      const id = uploadResponse.data.importId;

      setImportId(id);

      toast.dismiss(loadingToast);

      toast.success("CSV uploaded successfully.");

      // Queue processing
      await processImport(id);

      toast.success("Import queued successfully.");

      console.log("Import queued:", id);

      // Close modal after queueing
      resetUploadState();

      // Next:
      // Start polling using importId
    } catch (error: any) {
      console.error(error);

      toast.dismiss(loadingToast);

      if (error?.response?.status === 409) {
        toast.warning("This CSV has already been imported.");
      } else if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to start import.");
      }
    } finally {
      setIsProcessing(false);
    }
  }

  function handleCloseModal() {
    if (isProcessing) return;

    resetUploadState();
  }

  return (
    <DashboardLayout>
      <PageHeader onUploadClick={handleOpenUpload} />

      <UploadCard onUploadClick={handleOpenUpload} />

      <EmptyLeads />

      <UploadModal
        open={isUploadOpen}
        selectedFile={selectedFile}
        previewRows={previewRows}
        isProcessing={isProcessing}
        onClose={handleCloseModal}
        onFileSelect={handleFileSelect}
        onRemove={handleRemoveFile}
        onUpload={handleUpload}
      />
    </DashboardLayout>
  );
}
