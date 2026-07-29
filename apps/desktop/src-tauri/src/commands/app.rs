use serde::Serialize;
use tauri::AppHandle;

use crate::error::AppResult;

#[derive(Debug, Serialize)]
pub struct AppInfoDto {
    pub name: String,
    pub version: String,
    pub env: String,
}

#[tauri::command]
pub fn get_app_info(app: AppHandle) -> AppResult<AppInfoDto> {
    let pkg = app.package_info();
    Ok(AppInfoDto {
        name: pkg.name.clone(),
        version: pkg.version.to_string(),
        env: if cfg!(debug_assertions) { "development".into() } else { "production".into() },
    })
}

#[tauri::command]
pub fn get_platform() -> AppResult<&'static str> {
    Ok(std::env::consts::OS)
}
