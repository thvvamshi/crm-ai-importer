"use client";

import { useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import UploadCard from "@/components/home/UploadCard";
import EmptyLeads from "@/components/home/EmptyLeads";
import UploadModal from "@/components/upload/UploadModal";

export default function Home() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function handleOpenUpload() {
    setIsUploadOpen(true);
  }

  return (
    <DashboardLayout>
      <PageHeader onUploadClick={handleOpenUpload} />

      <UploadCard onUploadClick={handleOpenUpload} />

      <EmptyLeads />

      {isUploadOpen && (
        <div>
          <UploadModal
            open={isUploadOpen}
            selectedFile={selectedFile}
            onClose={() => setIsUploadOpen(false)}
            onFileSelect={setSelectedFile}
          />
        </div>
      )}
    </DashboardLayout>
  );
}
