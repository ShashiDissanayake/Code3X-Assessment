export type NoticeSeverity = 'success' | 'info' | 'warning' | 'error'

export interface Notice {
  message: string
  severity: NoticeSeverity
}
