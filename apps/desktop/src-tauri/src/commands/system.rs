use tauri::Manager;

#[tauri::command]
pub fn ping_window(app: tauri::AppHandle) -> Result<(), String> {
    if let Some(win) = app.get_webview_window("main") {
        let _ = win.set_title("Aikitr (pinged)");
    }
    Ok(())
}
