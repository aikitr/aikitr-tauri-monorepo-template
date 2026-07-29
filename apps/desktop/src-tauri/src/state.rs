use std::sync::Arc;
use tauri::AppHandle;
use tokio::sync::Mutex;

/// Process-wide application state. Anything held here must be `Send + Sync`.
pub struct AppState {
    pub app_handle: AppHandle,
    pub db: Arc<Mutex<Option<rusqlite::Connection>>>,
}

impl AppState {
    pub fn new(app_handle: AppHandle) -> Self {
        Self {
            app_handle,
            db: Arc::new(Mutex::new(None)),
        }
    }
}
