//! Aikitr Desktop backend library.
//!
//! This is the entry point for the Tauri runtime. Keep it thin — only register
//! plugins, commands and global event listeners here. Business logic should
//! live in dedicated modules under `commands/`, `services/`, etc.

use tauri::Manager;

mod commands;
mod error;
mod state;

pub use error::{AppError, AppResult};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_sql::Builder::default().build())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_http::init())
        .setup(|app| {
            let handle = app.handle().clone();
            app.manage(state::AppState::new(handle.clone()));
            commands::bootstrap(&handle);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::app::get_app_info,
            commands::app::get_platform,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
