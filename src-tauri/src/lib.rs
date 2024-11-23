use std::{os::windows::process::CommandExt, process::Command};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn play() -> () {
    let command = Command::new(
        "C:\\Users\\CANAD\\AppData\\Local\\Programs\\PrismLauncher\\prismlauncher.exe",
    )
    .args(["-l", "vanilla"])
    .creation_flags(0x08000000)
    .spawn()
    .map_err(|e| e.to_string());
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![play])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
