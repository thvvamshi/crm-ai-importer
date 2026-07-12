"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

import { parseCSV } from "@/lib/csv";
import {
  uploadImport,
  processImport,
  getImportStatus,
  getImportLeads,
  listImports,
} from "@/lib/imports";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import UploadCard from "@/components/home/UploadCard";
import EmptyLeads from "@/components/home/EmptyLeads";
import UploadModal from "@/components/upload/UploadModal";
import LeadsTable from "@/components/leads/LeadsTable";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  state: string;
  country: string;
  leadOwner: string;
  crmStatus: string | null;
  crmNote: string | null;
}

export default function Home() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewRows, setPreviewRows] = useState<Record<string, string>[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);

  const [leads, setLeads] = useState<Lead[]>([]);

  const [currentImportId, setCurrentImportId] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const pollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timeout on component unmount to prevent state updates on unmounted components
  useEffect(() => {
    void loadLatestImport();

    return () => {
      if (pollTimeoutRef.current) {
        clearTimeout(pollTimeoutRef.current);
        pollTimeoutRef.current = null;
      }
    };
  }, []);

  function handleOpenUpload() {
    setIsUploadOpen(true);
  }

  async function fetchLeads(id: string, page = 1) {
    try {
      setCurrentImportId(id);

      const response = await getImportLeads(id, page, pagination.limit);

      setLeads(response.data.leads);

      setPagination(response.data.pagination);

      if (page === 1) {
        toast.success(
          `${response.data.pagination.total} leads imported successfully`,
        );
      }

      resetUploadState();
    } catch (error) {
      console.error(error);
      toast.error("Unable to fetch imported leads.");
    }
  }

  function handlePageChange(page: number) {
    void fetchLeads(currentImportId, page);
  }

  async function loadLatestImport() {
    try {
      const response = await listImports(1, 1);

      const imports = response.data.imports;

      if (!imports?.length) {
        return;
      }

      await fetchLeads(imports[0].id, 1);
    } catch (error) {
      console.error(error);
    }
  }

  async function pollImport(id: string) {
    try {
      const response = await getImportStatus(id);
      const data = response.data;

      setStatus(data.status);
      setProgress(data.progress ?? 0);

      if (data.status === "COMPLETED") {
        if (pollTimeoutRef.current) {
          clearTimeout(pollTimeoutRef.current);
          pollTimeoutRef.current = null;
        }

        setIsProcessing(false);

        toast.success("Import completed successfully.");

        await fetchLeads(id, 1);
        return;
      }

      if (data.status === "FAILED") {
        if (pollTimeoutRef.current) {
          clearTimeout(pollTimeoutRef.current);
          pollTimeoutRef.current = null;
        }

        setIsProcessing(false);

        toast.error("Import failed.");

        return;
      }

      if (pollTimeoutRef.current) {
        clearTimeout(pollTimeoutRef.current);
      }

      pollTimeoutRef.current = setTimeout(() => {
        void pollImport(id);
      }, 2000);
    } catch (error) {
      console.error(error);

      if (pollTimeoutRef.current) {
        clearTimeout(pollTimeoutRef.current);
        pollTimeoutRef.current = null;
      }

      setIsProcessing(false);

      toast.error("Unable to track import status.");
    }
  }
  async function handleFileSelect(file: File) {
    setSelectedFile(file);
    try {
      const rows = await parseCSV(file);
      setPreviewRows(rows);
    } catch (error) {
      console.error(error);
      toast.error("Unable to preview CSV.");
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
    setStatus("");
    setProgress(0);
  }

  async function handleUpload() {
    if (!selectedFile || isProcessing) return;

    const loading = toast.loading("Uploading CSV...");

    try {
      setIsProcessing(true);

      const upload = await uploadImport(selectedFile);
      const id = upload.data.importId;

      toast.dismiss(loading);
      toast.success("CSV uploaded successfully.");

      await processImport(id);
      toast.success("Import started.");

      // Fire and forget polling with explicit void
      void pollImport(id);
    } catch (error: any) {
      console.error(error);
      setIsProcessing(false);
      toast.dismiss(loading);

      if (error?.response?.status === 409) {
        toast.warning("This CSV has already been imported.");
      } else if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to import CSV.");
      }
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

      {leads.length === 0 ? (
        <EmptyLeads />
      ) : (
        <LeadsTable
          leads={leads}
          pagination={pagination}
          onPageChange={handlePageChange}
          onImportMore={handleOpenUpload}
        />
      )}

      <UploadModal
        open={isUploadOpen}
        selectedFile={selectedFile}
        previewRows={previewRows}
        isProcessing={isProcessing}
        status={status}
        progress={progress}
        onClose={handleCloseModal}
        onFileSelect={handleFileSelect}
        onRemove={handleRemoveFile}
        onUpload={handleUpload}
      />
    </DashboardLayout>
  );
}
