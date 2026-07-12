"use client";

import { useState } from "react";

import { parseCSV } from "@/lib/csv";
import { uploadImport } from "@/lib/imports";

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

  function handleOpenUpload() {
    setIsUploadOpen(true);
  }

  async function handleFileSelect(file: File) {
    setSelectedFile(file);

    try {
      const rows = await parseCSV(file);

      setPreviewRows(rows);
    } catch (error) {
      console.error(error);
    }
  }

  function handleRemoveFile() {
    setSelectedFile(null);
    setPreviewRows([]);
  }

  async function handleUpload() {
    if (!selectedFile) return;

    try {
      setIsProcessing(true);

      const response = await uploadImport(selectedFile);

      console.log(response);

      setImportId(response.data.importId);

      alert("CSV uploaded successfully.");

      // Next step:
      // processImport(importId)
    } catch (error) {
      console.error(error);

      alert("Upload failed.");
    } finally {
      setIsProcessing(false);
    }
  }

  function handleCloseModal() {
    setIsUploadOpen(false);
    setSelectedFile(null);
    setPreviewRows([]);
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
