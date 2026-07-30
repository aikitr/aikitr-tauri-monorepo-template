use tauri::AppHandle;

/// Process-wide application state. Anything held here must be `Send + Sync`.
///
/// Note: SQLite access is handled by `tauri-plugin-sql` (managed via Tauri's
/// plugin state), so we don't hold a raw connection here.
pub struct AppState {
    #[allow(dead_code)]
    pub app_handle: AppHandle,
}

impl AppState {
    pub fn new(app_handle: AppHandle) -> Self {
        Self { app_handle }
    }
}
