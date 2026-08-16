export const constants = {
  APP_TITLE: 'AI Assistant',
  HEADER_MENU_CHAT_TEXT: 'Chat',
  HEADER_MENU_RAG_TEXT: 'RAG',
  HEADER_MENU_NL_TO_SQL_TEXT: 'NL to SQL',
  HEADER_MENU_HYBRID_TEXT: 'Hybrid',
  HEADER_MENU_ADMIN_TEXT: 'Admin',
  ACCEPTABLE_FILE_TYPE:
    '.pdf,.doc,.docx,.txt,application/pdf,' +
    'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,' +
    'text/plain',
  UPLOAD_FILE_TEXT: 'Upload files (PDF, DOC, DOCX, TXT)',
  UPLOAD_BUTTON_TEXT: 'Upload',
  DATABASE_TEXT: 'Refresh Database',
  DOCUMENTS_TEXT: 'Ingest Documents',
  DATA_REFRESH_TEXT: 'Data Refresh',
  RAG_MODE_TEXT: 'RAG',
  RESPONSE_TEXT: 'AI Response',
  GENERATED_SQL_TEXT: 'Generated SQL',
  EXECUTE_SQL_TEXT: 'Execute SQL',
  PROMPT_TEXT: 'Prompt',
  SUBMIT_TEXT: 'Submit',
  RAG_MODE: 'rag',
} as const;

export const endPoints = {
  ADMIN: 'http://localhost:8000/admin',
  FILE_UPLOAD: 'http://localhost:8000/admin/upload-files',
  URL_INGEST_DOCUMENTS: 'http://localhost:8000/admin/ingest/documents',
  URL_REFRESH_DOCUMENT: 'http://localhost:8000/admin/refresh/database',
  RAG: 'http://localhost:8000/rag',
} as const;
