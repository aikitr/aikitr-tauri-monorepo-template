use tauri::AppHandle;

pub mod app;
pub mod system;

/// Run startup tasks after plugins are loaded. Keep it idempotent.
pub fn bootstrap(_app: &AppHandle) {
    log::info!("aikitr backend bootstrap complete");
}
