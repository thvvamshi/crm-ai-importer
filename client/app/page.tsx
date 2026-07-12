"use client";

import { useState } from "react";

import { parseCSV } from "@/lib/csv";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import UploadCard from "@/components/home/UploadCard";
import EmptyLeads from "@/components/home/EmptyLeads";
import UploadModal from "@/components/upload/UploadModal";

export default function Home() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [previewRows, setPreviewRows] = useState<Record<string, string>[]>([]);

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
    console.log("Uploading...");

    console.log(selectedFile);

    console.log(previewRows);

    // Backend API integration next
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
        onClose={handleCloseModal}
        onFileSelect={handleFileSelect}
        onRemove={handleRemoveFile}
        onUpload={handleUpload}
      />
    </DashboardLayout>
  );
}
