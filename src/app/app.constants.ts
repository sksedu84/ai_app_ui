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
  DATABASE_TEXT: 'Database',
  DOCUMENTS_TEXT: 'Documents',
  DATA_REFRESH_TEXT: 'Data Refresh',
  CHAT_MODE_TEXT: 'Chat',
  SEARCH_MODE_TEXT: 'Search in Documents and/or Database',
  RESPONSE_TEXT: 'AI Response',
  GENERATED_SQL_TEXT: 'Generated SQL',
  EXECUTE_SQL_TEXT: 'Execute SQL',
  PROMPT_TEXT: 'Prompt',
  SUBMIT_TEXT: 'Submit',
  CHAT_MODE: 'chat',
  SEARCH_MODE: 'search',
} as const;

export const end_points = {
  CHAT_PROMPT: 'http://localhost:8080/chat/prompt',
  SEARCH_PROMPT: 'http://localhost:8080/search/prompt',
  ADMIN: 'http://localhost:8080/admin',
  FILE_UPLOAD: 'http://localhost:8080/admin/upload',
  REFRESH_DOCUMENT: 'http://localhost:8080/admin/refresh/document',
  REFRESH_DATABASE: 'http://localhost:8080/admin/refresh/database'
} as const;

