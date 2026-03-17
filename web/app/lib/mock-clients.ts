export const STATUS_STEPS = [
  {
    key: "APPLICATION_RECEIVED",
    th: "รับคำขอ",
    en: "Application Received",
  },
  {
    key: "DOCUMENT_VERIFICATION",
    th: "ตรวจสอบเอกสาร",
    en: "Document Verification",
  },
  {
    key: "PROCESSING_DLT",
    th: "อยู่ระหว่างดำเนินการที่กรมการขนส่งทางบก",
    en: "Processing with Department of Land Transport (DLT)",
  },
  {
    key: "LICENSE_ISSUED",
    th: "ออกใบอนุญาต / พร้อมรับ",
    en: "License Issued / Ready for Pickup",
  },
  {
    key: "DISPATCHED_COMPLETED",
    th: "จัดส่งแล้ว / เสร็จสิ้น",
    en: "Dispatched / Completed",
  },
] as const;

export type ApplicationStatusKey = (typeof STATUS_STEPS)[number]["key"];

export type MockClient = {
  full_name: string;
  passport_number: string;
  application_id: string;
  current_status: ApplicationStatusKey;
  notes?: string;
};

export const MOCK_CLIENTS: MockClient[] = [
  {
    full_name: "Maria Garcia",
    passport_number: "ES4455667",
    application_id: "TH-DL-2026-0001",
    current_status: "APPLICATION_RECEIVED",
    notes: "Submitted 2026-03-10. Awaiting initial review.",
  },
  {
    full_name: "John Smith",
    passport_number: "UK9988776",
    application_id: "TH-DL-2026-0002",
    current_status: "DOCUMENT_VERIFICATION",
  },
  {
    full_name: "Somchai Prasert",
    passport_number: "PA1234567",
    application_id: "TH-DL-2026-0003",
    current_status: "PROCESSING_DLT",
    notes: "Waiting for confirmation from DLT.",
  },
  {
    full_name: "Ananya Wong",
    passport_number: "PB7654321",
    application_id: "TH-DL-2026-0004",
    current_status: "LICENSE_ISSUED",
    notes: "Ready for pickup at Bangkok Consular Section.",
  },
  {
    full_name: "Priya Patel",
    passport_number: "IN5566778",
    application_id: "TH-DL-2026-0005",
    current_status: "DISPATCHED_COMPLETED",
    notes: "License mailed to address on file. Delivered 2026-03-14.",
  },
];

