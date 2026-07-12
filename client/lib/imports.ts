import { api } from "./api";

export async function uploadImport(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(
    "/imports",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return data;
}

export async function processImport(
  importId: string
) {
  const { data } = await api.post(
    `/imports/${importId}/process`
  );

  return data;
}

export async function getImportStatus(
  importId: string
) {
  const { data } = await api.get(
    `/imports/${importId}`
  );

  return data;
}

export async function getImportLeads(
  importId: string
) {
  const { data } = await api.get(
    `/imports/${importId}/leads`
  );

  return data;
}